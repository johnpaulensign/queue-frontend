(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66633151"],{"3d4c":function(t,e,n){},a3de:function(t,e,n){"use strict";n.r(e);var c=n("7a23"),a=Object(c["e"])("h4",null,"Control",-1),i=Object(c["e"])("label",{for:"ticketStart"},"Ticket Start",-1),u=Object(c["f"])(),r=Object(c["e"])("br",null,null,-1),o=Object(c["e"])("label",{for:"ticketEnd"},"Ticket End",-1),d=Object(c["f"])(),b=Object(c["e"])("br",null,null,-1),l=Object(c["e"])("input",{type:"submit"},null,-1);function f(t,e,n,f,k,s){return Object(c["q"])(),Object(c["d"])("div",null,[a,Object(c["e"])("form",{onSubmit:e[2]||(e[2]=Object(c["F"])((function(){return s.updateDashboard&&s.updateDashboard.apply(s,arguments)}),["prevent"]))},[i,Object(c["E"])(Object(c["e"])("input",{type:"text",name:"ticketStart",id:"ticketStart","onUpdate:modelValue":e[0]||(e[0]=function(t){return k.ticketStart=t})},null,512),[[c["B"],k.ticketStart]]),u,r,o,Object(c["E"])(Object(c["e"])("input",{type:"text",name:"ticketEnd",id:"ticketEnd","onUpdate:modelValue":e[1]||(e[1]=function(t){return k.ticketEnd=t})},null,512),[[c["B"],k.ticketEnd]]),d,b,l],32)])}var k=n("fb5f"),s={name:"control",data:function(){return{ticketStart:"",ticketEnd:""}},methods:{updateDashboard:function(){k["a"].update(window.location.host,{ticketStart:this.ticketStart,ticketEnd:this.ticketEnd})}},mounted:function(){var t=this;k["a"].get(window.location.host).then((function(e){var n=e.data[0];t.ticketStart=n.ticketStart,t.ticketEnd=n.ticketEnd}))}},p=(n("f243"),n("6b0d")),j=n.n(p);const O=j()(s,[["render",f]]);e["default"]=O},f243:function(t,e,n){"use strict";n("3d4c")},fb5f:function(t,e,n){"use strict";var c=n("d4ec"),a=n("bee2"),i=n("c427"),u=function(){function t(){Object(c["a"])(this,t)}return Object(a["a"])(t,[{key:"get",value:function(t){return i["a"].get("/dashboard/".concat(t))}},{key:"update",value:function(t,e){return i["a"].put("/dashboard/".concat(t),e)}}]),t}();e["a"]=new u}}]);
//# sourceMappingURL=chunk-66633151.abf76a05.js.map