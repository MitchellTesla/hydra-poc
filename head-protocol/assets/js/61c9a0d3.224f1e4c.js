"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[2899],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,f=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,s(s({ref:t},p),{},{components:n})):r.createElement(f,s({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2290:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),s=["components"],i={slug:6,title:"6. Network Broadcasts all messages\n",authors:[],tags:["Accepted"]},l=void 0,c={permalink:"/head-protocol/adr/6",source:"@site/adr/2021-06-10_006-network-broadcasts-all-messages.md",title:"6. Network Broadcasts all messages\n",description:"Status",date:"2021-06-10T00:00:00.000Z",formattedDate:"June 10, 2021",tags:[{label:"Accepted",permalink:"/head-protocol/adr/tags/accepted"}],readingTime:.92,truncated:!1,authors:[],frontMatter:{slug:"6",title:"6. Network Broadcasts all messages\n",authors:[],tags:["Accepted"]},prevItem:{title:"5. Use io-classes\n",permalink:"/head-protocol/adr/5"},nextItem:{title:"7. Use with-pattern based component interfaces\n",permalink:"/head-protocol/adr/7"}},p={authorsImageUrls:[]},u=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],m={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"status"},"Status"),(0,o.kt)("p",null,"Accepted"),(0,o.kt)("h2",{id:"context"},"Context"),(0,o.kt)("p",null,"The simplified Head protocol in the ",(0,o.kt)("a",{parentName:"p",href:"https://iohk.io/en/research/library/papers/hydrafast-isomorphic-state-channels/"},"Hydra\npaper"),"\nrequires ",(0,o.kt)("em",{parentName:"p"},"unicast")," and ",(0,o.kt)("em",{parentName:"p"},"multicast")," messaging between participants. However, this\ncan be simplified to only ",(0,o.kt)("em",{parentName:"p"},"multicast")," by also sending ",(0,o.kt)("inlineCode",{parentName:"p"},"AckTx")," messages to all\nparticipants and removing the necessity for ",(0,o.kt)("inlineCode",{parentName:"p"},"ConfTx"),"."),(0,o.kt)("p",null,"There is already a battle-tested implementation for ",(0,o.kt)("em",{parentName:"p"},"broadcasting")," messages over\nnetworks with any kind of topology (mesh), namely the\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/input-output-hk/ouroboros-network/tree/master/ouroboros-network/src/Ouroboros/Network/TxSubmission"},"TxSubmission"),"\nprotocol of ",(0,o.kt)("inlineCode",{parentName:"p"},"ouroroboros-network"),"."),(0,o.kt)("p",null,"If the network connects only to interested peers, ",(0,o.kt)("em",{parentName:"p"},"broadcast")," is essentially the\n",(0,o.kt)("em",{parentName:"p"},"multicast")," required by the protocol. If this is not the case, some addressing\nscheme is required and ",(0,o.kt)("em",{parentName:"p"},"broadcast")," would be a waste of resources."),(0,o.kt)("h2",{id:"decision"},"Decision"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"All messages emitted by a Hydra node through the Network component are ",(0,o.kt)("em",{parentName:"li"},"broadcasted")," to ",(0,o.kt)("em",{parentName:"li"},"all")," nodes in the network"),(0,o.kt)("li",{parentName:"ul"},"This implies the emitter shall itself receive the message")),(0,o.kt)("h2",{id:"consequences"},"Consequences"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The network layer is responsible for ensuring sent messages effectively\nreaches all nodes in the network. How this is achieved is left as an\nimplementation detail, i.e. whether it uses relaying or not."),(0,o.kt)("li",{parentName:"ul"},"We need to make sure all Head participants are connected to the same network.")))}d.isMDXComponent=!0}}]);