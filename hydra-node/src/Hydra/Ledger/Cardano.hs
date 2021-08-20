{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TypeApplications #-}
{-# OPTIONS_GHC -Wno-missing-methods #-}
{-# OPTIONS_GHC -Wno-orphans #-}

module Hydra.Ledger.Cardano where

import Hydra.Prelude hiding (id)

import Cardano.Binary (Annotator, FullByteString (Full), decodeFull', runAnnotator, serialize')
import qualified Cardano.Crypto.Hash.Class as Crypto
import qualified Cardano.Ledger.Address as Cardano
import Cardano.Ledger.Crypto (Crypto, StandardCrypto)
import Cardano.Ledger.Mary (MaryEra)
import qualified Cardano.Ledger.Mary.Value as Cardano
import qualified Cardano.Ledger.SafeHash as SafeHash
import qualified Codec.Binary.Bech32 as Bech32
import qualified Codec.Binary.Bech32.TH as Bech32
import Data.Aeson (
  FromJSONKey (fromJSONKey),
  FromJSONKeyFunction (FromJSONKeyTextParser),
  ToJSONKey,
  Value (String),
  decode,
  object,
  toJSONKey,
  withArray,
  withObject,
  withText,
  (.:),
  (.=),
 )
import Data.Aeson.Types (toJSONKeyText)
import Data.ByteString.Base16 (decodeBase16, encodeBase16)
import qualified Data.Sequence.Strict as StrictSeq
import qualified Data.Set as Set
import qualified Data.Text as Text
import Hydra.Ledger (Ledger (..), Tx (..))
import qualified Shelley.Spec.Ledger.API as Cardano
import Shelley.Spec.Ledger.Tx (WitnessSetHKD (WitnessSet)) -- REVIEW(SN): WitnessSet pattern is not reexported in API??

cardanoLedger :: Ledger CardanoTx
cardanoLedger =
  Ledger
    { applyTransactions = error "not implemented"
    , initUtxo = mempty
    }

type CardanoEra = MaryEra StandardCrypto

data CardanoTx = CardanoTx
  { id :: Cardano.TxId StandardCrypto
  , body :: CardanoTxBody StandardCrypto
  , witnesses :: CardanoTxWitnesses StandardCrypto
  }
  deriving stock (Eq, Show, Generic)
  deriving anyclass (ToJSON, FromJSON)

instance Tx CardanoTx where
  type Utxo CardanoTx = Cardano.UTxO CardanoEra
  type TxId CardanoTx = Cardano.TxId StandardCrypto

  txId = id

instance ToCBOR CardanoTx where
  toCBOR = error "TODO: toCBOR CardanoTx"

instance FromCBOR CardanoTx where
  fromCBOR = error "TODO: fromCBOR CardanoTx"

type CardanoTxBody crypto = Cardano.TxBody (MaryEra crypto)

type CardanoTxWitnesses crypto = Cardano.WitnessSet (MaryEra crypto)

--
--  Transaction Id
--

instance Crypto crypto => ToJSON (Cardano.TxId crypto) where
  toJSON = String . txIdToText @crypto

instance Crypto crypto => FromJSON (Cardano.TxId crypto) where
  parseJSON = withText "base16 encoded TxId" txIdFromText

txIdToText :: Cardano.TxId crypto -> Text
txIdToText (Cardano.TxId h) =
  encodeBase16 $ Crypto.hashToBytes $ SafeHash.extractHash h

txIdFromText :: (Crypto crypto, MonadFail m) => Text -> m (Cardano.TxId crypto)
txIdFromText t =
  case decodeBase16 (encodeUtf8 t) of
    Left e -> fail $ "decoding base16: " <> show e
    Right bytes ->
      case Crypto.hashFromBytes bytes of
        Nothing -> fail "hashFromBytes yielded Nothing"
        Just h -> pure . Cardano.TxId $ SafeHash.unsafeMakeSafeHash h

--
-- Transaction Body
--

instance Crypto crypto => FromJSON (CardanoTxBody crypto) where
  parseJSON = withObject "CardanoTxBody" $ \o -> do
    inputs <- o .: "inputs" >>= traverse parseJSON
    outputs <- o .: "outputs" >>= traverse parseJSON
    pure $
      Cardano.TxBody
        (Set.fromList inputs)
        (StrictSeq.fromList outputs)
        mempty
        (Cardano.Wdrl mempty)
        mempty
        maxBound
        Cardano.SNothing
        Cardano.SNothing

instance Crypto crypto => ToJSON (CardanoTxBody crypto) where
  toJSON (Cardano.TxBody inputs outputs _certs _wdrls _txfee _ttl _update _mdHash) =
    object
      [ "inputs" .= inputs
      , "outputs" .= outputs
      ]

--
-- Input
--

instance Crypto crypto => ToJSON (Cardano.TxIn crypto) where
  toJSON = toJSON . txInToText

instance Crypto crypto => FromJSON (Cardano.TxIn crypto) where
  parseJSON = withText "TxIn" txInFromText

txInFromText :: (Crypto crypto, MonadFail m) => Text -> m (Cardano.TxIn crypto)
txInFromText t = do
  let (txIdText, txIxText) = Text.breakOn "#" t
  Cardano.TxIn
    <$> txIdFromText txIdText
    <*> parseIndex txIxText
 where
  parseIndex txIxText =
    maybe
      (fail $ "cannot parse " <> show txIxText <> " as a natural index")
      pure
      (decode (encodeUtf8 $ Text.drop 1 txIxText))

txInToText :: Crypto crypto => Cardano.TxIn crypto -> Text
txInToText (Cardano.TxIn id ix) = txIdToText id <> "#" <> show ix

instance Crypto crypto => FromJSONKey (Cardano.TxIn crypto) where
  fromJSONKey = FromJSONKeyTextParser txInFromText

instance Crypto crypto => ToJSONKey (Cardano.TxIn crypto) where
  toJSONKey = toJSONKeyText txInToText

--
-- Output
--

instance Crypto crypto => ToJSON (Cardano.TxOut (MaryEra crypto)) where
  toJSON (Cardano.TxOut addr value) =
    object
      [ "address" .= serialiseAddressBech32
      , "value" .= valueToJson value
      ]
   where
    -- Serialise addresses in bech32 including the prefix as standardized:
    -- https://github.com/cardano-foundation/CIPs/blob/master/CIP-0005/CIP-0005.md
    serialiseAddressBech32 =
      Bech32.encodeLenient prefix . Bech32.dataPartFromBytes $ Cardano.serialiseAddr addr

    -- REVIEW(SN): The ledger's 'Addr' type is bigger than we need here and we
    -- are forced to come up with a prefix for Byron "bootstrap" addresses,
    -- although they should actually be serialised differently..and would not be
    -- relevant for Hydra in the first place.
    prefix = case addr of
      (Cardano.Addr Cardano.Mainnet _ _) -> [Bech32.humanReadablePart|addr|]
      (Cardano.Addr Cardano.Testnet _ _) -> [Bech32.humanReadablePart|addr_test|]
      (Cardano.AddrBootstrap _) -> [Bech32.humanReadablePart|addr_boot|]

instance Crypto crypto => FromJSON (Cardano.TxOut (MaryEra crypto)) where
  parseJSON = withObject "TxOut" $ \o -> do
    address <- o .: "address" >>= deserialiseAddressBech32
    value <- o .: "value" >>= valueParseJson
    pure $ Cardano.TxOut address value
   where
    valueParseJson = withObject "Value" $ \o ->
      Cardano.Value <$> o .: "lovelace" <*> pure mempty

    deserialiseAddressBech32 t =
      case Bech32.decodeLenient t of
        Left err -> fail $ "failed to decode bech32: " <> show err
        Right (prefix, dataPart) ->
          let mAddr = Bech32.dataPartToBytes dataPart >>= Cardano.deserialiseAddr
           in case (Bech32.humanReadablePartToText prefix, mAddr) of
                ("addr", Just addr@(Cardano.Addr Cardano.Mainnet _ _)) -> pure addr
                ("addr_test", Just addr@(Cardano.Addr Cardano.Testnet _ _)) -> pure addr
                ("addr_boot", Just addr@(Cardano.AddrBootstrap _)) -> pure addr
                (p, Just _) -> fail $ "invalid bech32 prefix: " <> show p
                (_, Nothing) -> fail "failed to decode data part"

valueToJson :: Cardano.Value crypto -> Value
valueToJson (Cardano.Value lovelace _assets) =
  object ["lovelace" .= lovelace]

--
-- Utxo
--

instance Semigroup (Cardano.UTxO (MaryEra crypto)) where
  Cardano.UTxO u1 <> Cardano.UTxO u2 = Cardano.UTxO (u1 <> u2)

instance Monoid (Cardano.UTxO (MaryEra crypto)) where
  mempty = Cardano.UTxO mempty

instance Crypto crypto => ToJSON (Cardano.UTxO (MaryEra crypto)) where
  toJSON = toJSON . Cardano.unUTxO

instance Crypto crypto => FromJSON (Cardano.UTxO (MaryEra crypto)) where
  parseJSON v = Cardano.UTxO <$> parseJSON v

--
-- witnesses
--

instance Crypto crypto => ToJSON (CardanoTxWitnesses crypto) where
  toJSON (WitnessSet addrWitnesses _ _) = toJSON $ map (encodeBase16 . serialize') $ toList addrWitnesses

instance
  ( Crypto crypto
  , FromCBOR (Annotator (Cardano.WitVKey 'Cardano.Witness crypto))
  ) =>
  FromJSON (CardanoTxWitnesses crypto)
  where
  parseJSON = withArray "CardanoTxWitnesses" $ \a -> do
    wits <- toList <$> traverse parseAddressWitness a
    pure $ WitnessSet (Set.fromList wits) mempty mempty
   where
    parseAddressWitness = withText "AddrWitness" $ \t ->
      -- TODO(AB): this is ugly
      case decodeBase16 $ encodeUtf8 t of
        Left err -> fail $ show err
        Right bs' -> case decodeFull' bs' of
          Left err -> fail $ show err
          Right v -> pure $ runAnnotator v (Full $ fromStrict bs')