"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[6691],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),h=a,f=p["".concat(l,".").concat(h)]||p[h]||d[h]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9681:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={},l="Frequently Asked Questions",c={unversionedId:"faq/index",id:"faq/index",title:"Frequently Asked Questions",description:"And their answers!",source:"@site/core-concepts/faq/index.md",sourceDirName:"faq",slug:"/faq/",permalink:"/head-protocol/core-concepts/faq/",editUrl:"https://github.com/input-output-hk/hydra-poc/tree/master/docs/core-concepts/core-concepts/faq/index.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Handling Rollbacks",permalink:"/head-protocol/core-concepts/rollbacks/"}},u={},d=[],p={toc:d};function h(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"frequently-asked-questions"},"Frequently Asked Questions"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"And their answers!")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"When Hydra?"),"Our ",(0,o.kt)("a",{href:"https://github.com/orgs/input-output-hk/projects/21/"},"roadmap")," is publicly available on Github. Note that there are multiple sections behind tabs to view it from different angles (as release packages, as quarters, etc...)"),(0,o.kt)("details",null,(0,o.kt)("summary",null,"When is the Hydra Head protocol a good fit?"),(0,o.kt)("p",null,"  The Hydra Head protocol is well-suited for any situation where a known set of participants know each other well-enough to agree on building a network but don't trust one another enough with funds management to do so without ways to secure their assets backed by the possibility to settle disputes on the main chain.")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Can I run Plutus scripts inside a head?"),(0,o.kt)("p",null,"  Yes! Transactions running between head participants are full-blown Alonzo transactions. They carry scripts, and spend UTxO in all-the-same manner as layer 1 transactions. Incidentally, each Hydra node is running a Cardano ledger and maintaining a ledger state. However, DApps which currently reliy on the PAB for on-chain interactions will fall short when it comes to driving the execution of a Plutus contract inside a head. Indeed, the PAB is currently tightly coupled to the Cardano layer 1 chain; it is a Cardano client that interacts with the chain using the node-to-client mini-protocols (chain-sync, state-query, tx-submission). Hydra nodes do not expose such protocols (yet), making it incompatible with the PAB.")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Can a third-party run a Hydra node on behalf of a wallet owners (e.g. running managed Hydra Heads)?"),(0,o.kt)("p",null,"  Totally! This is similar for instance to ",(0,o.kt)("a",{parentName:"p",href:"https://phoenix.acinq.co/"},"Phoenix")," in Bitcoin Lightning: a non-custodial managed lightning node. As an end-user, one still have full control on the keys and funds, but the underlying infrastructure is managed on one's behalf (provided fees). This however implies some form of trust between the service provider and the user. Indeed, the user implicitly trusts the service provider to, for instance, properly handle contestations and closure of a head.   ")),(0,o.kt)("details",null,(0,o.kt)("summary",null,"What is the relationship between Hydra heads and Hydra nodes?"),(0,o.kt)("p",null,"  It is (at least","*",") a ",(0,o.kt)("strong",{parentName:"p"},"one-to-many")," relationship. Each Hydra head is comprised of several Hydra nodes. We are currently aiming for up to 100 nodes per head as a stretch goal. Heads are independent and form an isolated network. It is possible to have infinitely many heads running in parallel. "),(0,o.kt)("p",null,"  ",(0,o.kt)("em",{parentName:"p"},"(","*",") It is possible to make Hydra nodes support multiple heads making it a many-to-many relationship."))),(0,o.kt)("details",null,(0,o.kt)("summary",null,"Is the Hydra Head protocol a side-chain?"),"No it isn't. In fact, there are two crucial facts that discards heads from being seen as side-chains:",(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"There's no guaranteed data availability on Hydra. Said differently, transactions are (a) only known of the head participants, and (b) typically forgotten as soon as they're processed. Indeed, there's no block in a Hydra head and also no incentive for participants to either keep the history around or make it available to users outside of the head.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"A head network is static, new participants cannot join and have to be decided upfront. The network is thus very much isolated / private, and not reachable by any peer. Hydra heads are really channels between a set of well-known participants.")))))}h.isMDXComponent=!0}}]);