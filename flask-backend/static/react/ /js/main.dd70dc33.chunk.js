(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(45)},23:function(e,t,a){},43:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(10),s=a.n(i),c=(a(23),a(11)),o=a(12),r=a(15),u=a(13),d=a(16),m=a(2),h=a(14),v=a.n(h),p=(a(43),a(44),function(e){function t(e,a){var n;return Object(c.a)(this,t),(n=Object(r.a)(this,Object(u.a)(t).call(this,e,a))).state={data:"",isLoading:!1,value:" ",value2:" ",dummy_values:!1},n.handleSubmit=n.handleSubmit.bind(Object(m.a)(Object(m.a)(n))),n.click=n.click.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(t,e),Object(o.a)(t,[{key:"click",value:function(){var e=this,t={template:this.state.value,values:this.state.value2,input_type:"json",dummy_values:this.state.dummy_values};this.setState({isLoading:!0}),v.a.post("http://localhost:5000/convert",{request_info:t},{headers:{"Content-Type":"application/json"}}).then(function(a){e.setState({data:a.data,isLoading:!1}),console.log(t)}).catch(function(a){e.setState({data:a,isLoading:!1}),console.log(t)})}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleChange2",value:function(e){this.setState({value2:e.target.value})}},{key:"toggleDummy",value:function(e){this.setState({dummy_values:!this.state.dummy_values})}},{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("p",null,window.token),l.a.createElement("form",{class:"container"},l.a.createElement("div",{class:"row"},l.a.createElement("div",{class:"col-md-5"},l.a.createElement("h1",null,"Template"),l.a.createElement("textarea",{id:"template",placeholder:" Hello {{name}}! {% if test -%} How are you?{%- endif %}",onChange:this.handleChange.bind(this)})),l.a.createElement("div",{class:"col-md-5"},l.a.createElement("h1",null,"Render"),l.a.createElement("div",{id:"render"}," ",this.state.loading||!this.state.data?l.a.createElement("div",{id:"render"},"Press Convert..."):l.a.createElement("div",null,this.state.data.toString().replace(/\u2022/g," "))))),l.a.createElement("div",{class:"row"},l.a.createElement("div",{class:"col-md-5"},l.a.createElement("h1",null,"Values"),l.a.createElement("textarea",{id:"values",placeholder:' {"name": "John", "test": true }',onChange:this.handleChange2.bind(this)})),l.a.createElement("div",{class:"col-md-5"},l.a.createElement("div",{id:"settings"},l.a.createElement("h1",null," JSON"),l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",name:"dummyvalues",onClick:this.toggleDummy.bind(this)})," Use dummy values"),l.a.createElement("div",null,l.a.createElement("input",{type:"button",class:"btn btn-success",id:"convert",value:"Convert",onClick:this.click,disabled:this.state.isLoading}),l.a.createElement("input",{type:"button",class:"btn btn-danger",id:"clear",value:"Clear"})))))))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.dd70dc33.chunk.js.map