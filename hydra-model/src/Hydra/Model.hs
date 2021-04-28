{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE UndecidableInstances #-}
{-# OPTIONS_GHC -Wno-deferred-type-errors #-}
{-# OPTIONS_GHC -Wno-deprecations #-}
{-# OPTIONS_GHC -Wno-incomplete-patterns #-}

-- | A high-level model for a cluster of Hydra nodes
module Hydra.Model where

import Cardano.Prelude hiding (Async, async, atomically, threadDelay, throwIO)
import Control.Monad.Class.MonadAsync (Async, MonadAsync, async)
import Control.Monad.Class.MonadSTM (MonadSTM (atomically), TVar, modifyTVar, newTVar, readTVar, writeTVar)
import Control.Monad.Class.MonadThrow (MonadThrow, throwIO)
import Control.Monad.Class.MonadTimer (threadDelay)
import Control.Monad.IOSim (runSimOrThrow)
import Hydra.Ledger.MaryTest (MaryTest, noUTxO)
import Hydra.Logic (Event (OnChainEvent), OnChainTx (CollectComTx, InitTx))
import Hydra.Node (ClientSide (..), EventQueue (putEvent), HydraNetwork (..), Node (..), OnChain (..), createEventQueue)
import Hydra.Node.Run (emptyHydraHead, runNode)
import qualified Hydra.Node.Run as Run
import qualified Shelley.Spec.Ledger.API as Shelley

-- * Ledger Dependent Types

type Utxo = Shelley.UTxO MaryTest
type Transaction = Shelley.Tx MaryTest
type Ledger = Shelley.LedgerState MaryTest

-- |A single `Action` to run on a specific node
data Action = Action {targetNode :: NodeId, request :: Request}
  deriving (Eq, Show)

-- | An opaque identifier of a node to run a `Request` on
newtype NodeId = NodeId Natural
  deriving newtype (Eq, Show, Num)

-- |All possible requests a client can make to a `Node`
data Request
  = -- |Initialises a new head
    -- TODO: This is a simplification over the actual Hydra Head's dance of Init/Commit/CollectCom
    -- process.
    Init Utxo
  | -- |Submit a new transaction to the head
    NewTx Transaction
  | -- | Close the Head
    Close
  deriving (Eq, Show)

-- |A cluster of Hydra `Node`s that is managed by a given `Model`
newtype HydraNodes m = HydraNodes
  {nodes :: [HydraNode m]}

-- | An instance of a Hydra node
data HydraNode m = HydraNode {nodeId :: NodeId, runningNode :: RunningNode m}

data RunningNode m = RunningNode {node :: Node m Transaction, thread :: Async m ()}

-- |The `Model` which "drives" the nodes and maintains expected state.
data Model m = Model
  { -- |The nodes currently part of this `Model`
    cluster :: HydraNodes m
  , -- |The current expected consensus state of the ledger
    modelState :: TVar m ModelState
  }

selectNode :: NodeId -> HydraNodes m -> Maybe (HydraNode m)
selectNode target (HydraNodes nodes) = find ((== target) . nodeId) nodes

-- | The state of the system, including the expected `HeadState` and the nodes' state.
data ModelState = ModelState
  { nodeLedgers :: [Utxo]
  , currentState :: HeadState
  }
  deriving (Eq, Show)

data HeadState
  = Closed (Maybe Utxo)
  | Open Utxo
  | Failed Text
  deriving (Eq, Show)

expectedUtxo :: HeadState -> Utxo
expectedUtxo (Closed Nothing) = noUTxO
expectedUtxo (Closed (Just u)) = u
expectedUtxo (Open l) = l

ledgerUtxo :: Ledger -> Utxo
ledgerUtxo = Shelley._utxo . Shelley._utxoState

-- | Run a sequence of actions on a new `Model`
-- Returns the `Model` after it's been updated
runModel :: [Action] -> ModelState
runModel acts =
  runSimOrThrow
    ( do
        initial <- initialiseModel
        model <- foldM runAction initial acts
        threadDelay 3.14e7
        atomically $ readTVar (modelState model)
    )

-- | Collect the UTXOs from all nodes
-- TODO: This is not the right way to do it probably
collectLedgers :: MonadSTM m => Model m -> m (Model m)
collectLedgers m@Model{modelState} = do
  l <- catMaybes <$> mapM (Run.getConfirmedLedger . node . runningNode) (nodes . cluster $ m)
  atomically $ modifyTVar modelState $ \ms -> ms{nodeLedgers = map ledgerUtxo l}
  pure m

-- | Run a single `Action` on the cluster of nodes
runAction ::
  MonadSTM m =>
  MonadThrow m =>
  Model m ->
  Action ->
  m (Model m)
runAction model@Model{cluster, modelState} action =
  (atomically . readTVar $ modelState)
    >>= \ms -> case (ms, action) of
      (ModelState [] (Closed Nothing), Action target (Init utxo)) ->
        selectNode target cluster & maybe (pure model) (init utxo model)
      (ModelState [] Open{}, Action target (NewTx tx)) ->
        selectNode target cluster & maybe (pure model) (newTx tx model)
      (ModelState [] Open{}, Action target Close) ->
        selectNode target cluster & maybe (pure model) (close model)

-- TODO: Flesh out errors from the execution
newtype ModelError = ModelError Text
  deriving (Eq, Show)

instance Exception ModelError

init ::
  MonadSTM m =>
  MonadThrow m =>
  Utxo ->
  Model m ->
  HydraNode m ->
  m (Model m)
init utxo m (runningNode -> RunningNode n _) = do
  atomically $ writeTVar (modelState m) $ ModelState [] (Open utxo)
  Run.init n >>= \case
    Left e -> throwIO (ModelError $ show e)
    Right () -> pure m

newTx ::
  Monad m =>
  Transaction ->
  Model m ->
  HydraNode m ->
  m (Model m)
newTx tx m (runningNode -> RunningNode n _) = do
  Run.newTx n tx >> pure m -- tx can be invalid

close ::
  MonadSTM m =>
  MonadThrow m =>
  Model m ->
  HydraNode m ->
  m (Model m)
close m@Model{modelState} (runningNode -> RunningNode n _) = do
  void $ collectLedgers m
  Run.close n
  atomically $
    modifyTVar modelState $ \ms ->
      let u = expectedUtxo (currentState ms)
       in ms{currentState = Closed (Just u)}
  pure m

initialiseModel ::
  MonadSTM m =>
  MonadAsync m =>
  MonadThrow m =>
  m (Model m)
initialiseModel = do
  st <- atomically $ newTVar (ModelState [] (Closed Nothing))
  node1 <- HydraNode 1 <$> runHydraNode st
  --  node2 <- HydraNode 2 <$> runHydraNode st
  pure $ Model (HydraNodes [node1]) st

runHydraNode ::
  MonadAsync m =>
  MonadThrow m =>
  TVar m ModelState ->
  m (RunningNode m)
runHydraNode st = do
  eventQueue <- createEventQueue
  hydraHead <- emptyHydraHead
  onChainClient <- mockChainClient st eventQueue
  hydraNetwork <- mockHydraNetwork eventQueue
  clientSideRepl <- mockClientSideRepl
  let node = Node{..}
  async (runNode node) >>= \thread -> pure $ RunningNode node thread

mockClientSideRepl :: Applicative m => m (ClientSide m)
mockClientSideRepl =
  pure $ ClientSide $ const $ pure () -- ignore all client side instructions

mockHydraNetwork ::
  Applicative m =>
  EventQueue m e ->
  m (HydraNetwork m)
mockHydraNetwork _ =
  pure $
    HydraNetwork
      { broadcast = const $ pure () -- just drop all messages
      }

mockChainClient ::
  MonadSTM m =>
  TVar m ModelState ->
  EventQueue m (Event Transaction) ->
  m (OnChain Transaction m)
mockChainClient varm q =
  pure $
    OnChain $ \case
      InitTx ->
        trace @Text "posted init tx" $
          atomically (expectedUtxo . currentState <$> readTVar varm)
            >>= \utxos -> putEvent q (OnChainEvent $ CollectComTx utxos)
      _ -> pure ()
