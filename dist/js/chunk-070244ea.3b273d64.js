(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-070244ea"],{"6a2a":function(e,t,n){"use strict";n("da22")},af6b:function(e,t,n){"use strict";n.r(t);n("b0c0");var u=n("7a23"),c={key:0,class:"edit-form"},r=Object(u["e"])("h4",null,"Customer",-1),o={class:"form-group"},a=Object(u["e"])("label",{for:"name"},"Name",-1),s={class:"form-group"},l=Object(u["e"])("label",{for:"phone"},"Phone",-1),i={class:"form-group"},m=Object(u["e"])("label",{for:"email"},"Email",-1),d={class:"form-group"},f=Object(u["e"])("label",{for:"ticketNumber"},"Ticket Number",-1),b={key:1},p=Object(u["e"])("br",null,null,-1),h=Object(u["e"])("p",null,"Please click on a Customer...",-1),g=[p,h];function C(e,t,n,p,h,C){return h.currentCustomer?(Object(u["q"])(),Object(u["d"])("div",c,[r,Object(u["e"])("form",null,[Object(u["e"])("div",o,[a,Object(u["E"])(Object(u["e"])("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":t[0]||(t[0]=function(e){return h.currentCustomer.name=e})},null,512),[[u["B"],h.currentCustomer.name]])]),Object(u["e"])("div",s,[l,Object(u["E"])(Object(u["e"])("input",{type:"text",class:"form-control",id:"phone","onUpdate:modelValue":t[1]||(t[1]=function(e){return h.currentCustomer.phone=e})},null,512),[[u["B"],h.currentCustomer.phone]])]),Object(u["e"])("div",i,[m,Object(u["E"])(Object(u["e"])("input",{type:"text",class:"form-control",id:"email","onUpdate:modelValue":t[2]||(t[2]=function(e){return h.currentCustomer.email=e})},null,512),[[u["B"],h.currentCustomer.email]])]),Object(u["e"])("div",d,[f,Object(u["E"])(Object(u["e"])("input",{type:"text",class:"form-control",id:"ticketNumber","onUpdate:modelValue":t[3]||(t[3]=function(e){return h.currentCustomer.ticketNumber=e})},null,512),[[u["B"],h.currentCustomer.ticketNumber]])])]),Object(u["e"])("button",{class:"badge badge-danger mr-2",onClick:t[4]||(t[4]=function(){return C.deleteCustomer&&C.deleteCustomer.apply(C,arguments)})}," Delete "),Object(u["e"])("button",{type:"submit",class:"badge badge-success",onClick:t[5]||(t[5]=function(){return C.updateCustomer&&C.updateCustomer.apply(C,arguments)})}," Update "),Object(u["e"])("p",null,Object(u["z"])(h.message),1)])):(Object(u["q"])(),Object(u["d"])("div",b,g))}var j=n("f562"),O={name:"customer",data:function(){return{currentCustomer:null,message:""}},methods:{getCustomer:function(e){var t=this;j["a"].get(e).then((function(e){t.currentCustomer=e.data,console.log(e.data)})).catch((function(e){console.log(e)}))},updatePublished:function(e){var t=this,n={id:this.currentCustomer.id,name:this.currentCustomer.name,phone:this.currentCustomer.phone,email:this.currentCustomer.email,published:e};j["a"].update(this.currentCustomer.id,n).then((function(n){console.log(n.data),t.currentCustomer.published=e,t.message="The status was updated successfully!"})).catch((function(e){console.log(e)}))},updateCustomer:function(){var e=this;j["a"].update(this.currentCustomer.id,this.currentCustomer).then((function(t){console.log(t.data),e.message="The customer was updated successfully!"})).catch((function(e){console.log(e)}))},deleteCustomer:function(){var e=this;j["a"].delete(this.currentCustomer.id).then((function(t){console.log(t.data),e.$router.push({name:"customers"})})).catch((function(e){console.log(e)}))}},mounted:function(){this.message="",this.getCustomer(this.$route.params.id)}},y=(n("6a2a"),n("6b0d")),v=n.n(y);const k=v()(O,[["render",C]]);t["default"]=k},b0c0:function(e,t,n){var u=n("83ab"),c=n("5e77").EXISTS,r=n("9bf2").f,o=Function.prototype,a=o.toString,s=/^\s*function ([^ (]*)/,l="name";u&&!c&&r(o,l,{configurable:!0,get:function(){try{return a.call(this).match(s)[1]}catch(e){return""}}})},da22:function(e,t,n){},f562:function(e,t,n){"use strict";var u=n("d4ec"),c=n("bee2"),r=n("c427"),o=function(){function e(){Object(u["a"])(this,e)}return Object(c["a"])(e,[{key:"getAll",value:function(){return r["a"].get("/customers")}},{key:"get",value:function(e){return r["a"].get("/customers/".concat(e))}},{key:"create",value:function(e){return r["a"].post("/customers",e)}},{key:"update",value:function(e,t){return r["a"].put("/customers/".concat(e),t)}},{key:"delete",value:function(e){return r["a"].delete("/customers/".concat(e))}},{key:"deleteAll",value:function(){return r["a"].delete("/customers")}},{key:"findByName",value:function(e){return r["a"].get("/customers?name=".concat(e))}},{key:"findByAny",value:function(e){return r["a"].get("/customers/any?query=".concat(e))}}]),e}();t["a"]=new o}}]);
//# sourceMappingURL=chunk-070244ea.3b273d64.js.map