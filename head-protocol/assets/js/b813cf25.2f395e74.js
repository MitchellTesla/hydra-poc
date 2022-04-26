"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[9099],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,h=u["".concat(p,".").concat(m)]||u[m]||s[m]||i;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7316:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return s}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={slug:14,title:"14. Token usage in Hydra Scripts\n",authors:[],tags:["Accepted"]},p=void 0,c={permalink:"/head-protocol/adr/14",source:"@site/adr/2022-02-14_014-hydra-script-tokens.md",title:"14. Token usage in Hydra Scripts\n",description:"Status",date:"2022-02-14T00:00:00.000Z",formattedDate:"February 14, 2022",tags:[{label:"Accepted",permalink:"/head-protocol/adr/tags/accepted"}],readingTime:2.355,truncated:!1,authors:[],frontMatter:{slug:"14",title:"14. Token usage in Hydra Scripts\n",authors:[],tags:["Accepted"]},prevItem:{title:"13. Plutus Contracts Testing Strategy\n",permalink:"/head-protocol/adr/13"},nextItem:{title:"15. Configuration Through an Admin API\n",permalink:"/head-protocol/adr/15"}},d={authorsImageUrls:[]},s=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2},{value:"Follow-up questions",id:"follow-up-questions",level:2}],u={toc:s};function m(e){var t=e.components,l=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"status"},"Status"),(0,i.kt)("p",null,"Accepted"),(0,i.kt)("h2",{id:"context"},"Context"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The Hydra on-chain-verification scripts are used to validate Hydra protocol transactions and ensure they are lawful."),(0,i.kt)("li",{parentName:"ul"},"At least these three properties need to be enforced:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Authentication: ensure that only Head participants can, for example, ",(0,i.kt)("inlineCode",{parentName:"li"},"abort")," a Head"),(0,i.kt)("li",{parentName:"ul"},"Contract continuity: ensure that a Head was ",(0,i.kt)("inlineCode",{parentName:"li"},"init"),"ialized before it can be opened by a ",(0,i.kt)("inlineCode",{parentName:"li"},"collectCom")," tx."),(0,i.kt)("li",{parentName:"ul"},"Completeness: ensure that all Head participants had chance to ",(0,i.kt)("inlineCode",{parentName:"li"},"commit")," funds to a Head."))),(0,i.kt)("li",{parentName:"ul"},"The Hydra Head paper introduces ",(0,i.kt)("strong",{parentName:"li"},"participation tokens (PT)")," and a ",(0,i.kt)("strong",{parentName:"li"},"state thread token (ST)")," for that matter."),(0,i.kt)("li",{parentName:"ul"},"Such tokens (a.k.a native assets) are identified by the ",(0,i.kt)("inlineCode",{parentName:"li"},"CurrencySymbol"),", that is the hash of their ",(0,i.kt)("inlineCode",{parentName:"li"},"MintingPolicyScript")," (a.k.a ",(0,i.kt)("inlineCode",{parentName:"li"},"PolicyID")," in the ledger), and a ",(0,i.kt)("inlineCode",{parentName:"li"},"ByteString"),", the socalled ",(0,i.kt)("inlineCode",{parentName:"li"},"TokenName")," (a.k.a as ",(0,i.kt)("inlineCode",{parentName:"li"},"AssetName")," in the ledger, see ",(0,i.kt)("a",{parentName:"li",href:"https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/specs.shelley-ma/latest/download-by-type/doc-pdf/shelley-ma#subsection.3.2"},"shelley-ma ledger spec"),")"),(0,i.kt)("li",{parentName:"ul"},"There can be multiple Hydra Heads on a network and a ",(0,i.kt)("inlineCode",{parentName:"li"},"hydra-node")," need to distinguish individual Head instances or even (later) keep track of multiple Heads. Concretely, this means that we need to infer a Head identifier (",(0,i.kt)("inlineCode",{parentName:"li"},"HeadId"),") from observing each of the Hydra protocol transactions. ")),(0,i.kt)("h2",{id:"decision"},"Decision"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"We solve both challenges by defining that ST and PTs ",(0,i.kt)("strong",{parentName:"li"},"shall use the same")," ",(0,i.kt)("inlineCode",{parentName:"li"},"MintingPolicyScript")," and thus have same ",(0,i.kt)("inlineCode",{parentName:"li"},"CurrencySymbol")),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"MintingPolicyScript")," shall be parameterized by ",(0,i.kt)("inlineCode",{parentName:"li"},"TxOutRef")," to yield a unique ",(0,i.kt)("inlineCode",{parentName:"li"},"CurrencySymbol")," per Head\n(similar to the ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/plutus/tree/1efbb276ef1a10ca6961d0fd32e6141e9798bd11/plutus-use-cases/src/Plutus/Contracts/Currency.hs"},(0,i.kt)("inlineCode",{parentName:"a"},"OneShotCurrency"))," example)"),(0,i.kt)("li",{parentName:"ul"},"ST and one PT per participant are minted in the ",(0,i.kt)("inlineCode",{parentName:"li"},"initTx")),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"TokenName")," of the ST can be any well-known ",(0,i.kt)("inlineCode",{parentName:"li"},"ByteString"),", e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},'"HydraHeadV1"')),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"TokenName")," of the PTs needs to be the ",(0,i.kt)("inlineCode",{parentName:"li"},"PubKeyHash")," of the respective participant")),(0,i.kt)("h2",{id:"consequences"},"Consequences"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Heads can be identified by looking for the ",(0,i.kt)("inlineCode",{parentName:"p"},"ST")," in ",(0,i.kt)("inlineCode",{parentName:"p"},"init"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"collectCom"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"close"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"contest")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"fanout")," transactions, or the ",(0,i.kt)("inlineCode",{parentName:"p"},"PT")," in ",(0,i.kt)("inlineCode",{parentName:"p"},"commit")," transactions. In both cases, the ",(0,i.kt)("inlineCode",{parentName:"p"},"CurrencySymbol == HeadId"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Our scripts become simpler as we only need to check that ST/PT are paid forward, instead of needing to check datums")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The datum produced by ",(0,i.kt)("inlineCode",{parentName:"p"},"commit")," txs (and consumed by ",(0,i.kt)("inlineCode",{parentName:"p"},"collectCom"),") is ",(0,i.kt)("inlineCode",{parentName:"p"},"Just SerializedTxOut"),", which is simpler than also keeping the participant which committed in the datum (compare to full life-cycle of ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/input-output-hk/hydra-poc/tree/0.3.0/docs/images/on-chain-full.jpg"},"0.3.0"),").")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"v_head")," script validator does not need to be parameterized, which makes discovering new Heads (and also tracking them for metrics) easier as the address to watch for is common to all Heads (of the same ",(0,i.kt)("inlineCode",{parentName:"p"},"v_head")," version).")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"v_head")," script (path) for the abort life-cycle can be implemented already much safer by checking that all PTs are burned on the ",(0,i.kt)("inlineCode",{parentName:"p"},"abort")," transaction (counting inputs in abort life-cycle of ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/input-output-hk/hydra-poc/tree/0.3.0/docs/images/on-chain-abort.jpg"},"0.3.0"),").")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Updated diagrams for the ",(0,i.kt)("a",{target:"_blank",href:n(1288).Z},"full")," and ",(0,i.kt)("a",{target:"_blank",href:n(3443).Z},"abort")," on-chain life-cycles of a Hydra Head."))),(0,i.kt)("h2",{id:"follow-up-questions"},"Follow-up questions"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"What value does the ",(0,i.kt)("inlineCode",{parentName:"li"},"ST")," actually add? We could always look for the ",(0,i.kt)("inlineCode",{parentName:"li"},"PT")," to identify a Head and contract continuity would already be achieved by the ",(0,i.kt)("inlineCode",{parentName:"li"},"PT"),"s!")))}m.isMDXComponent=!0},3443:function(e,t,n){t.Z=n.p+"assets/files/on-chain-abort-c3483946d3116662c5cabfd67e3dde4e.jpg"},1288:function(e,t,n){t.Z=n.p+"assets/files/on-chain-full-eea3dda97376810a7bfac1848a11a84a.jpg"}}]);