/*!
 *  VITest.js v0.6.0110
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */
(function(){var c={message:"UNKNOWN_ERROR",stack:""};var g={projectId:null,errors:[],init:function(i){this.projectId=i;if(window.VITestErrors&&VITestErrors.length){VITestErrors.forEach(function(j){g.reportError(j)})}a();d();b()},reportError:function(l){var j=l.error;if(!j&&!l.message){j=c}var k=(j&&j.message)||l.message;var i=(j&&j.stack)||l.message;if(this.errors.indexOf(i)>=0){return}this.errors.push(i);h(k,i,l.isTrusted)}};function a(){window.addEventListener("error",function(i){g.reportError(i)})}function d(){var j=window.XMLHttpRequest;if(!j){return}var i=window.XMLHttpRequest.prototype.open;window.XMLHttpRequest.prototype.open=function(){var n=this;var l=[].slice.call(arguments),k=l[1];var m=n.onreadystatechange||function(){};n.onreadystatechange=function(){if(n.readyState==4){if((n.status>=200&&n.status<300)||n.status==304){}else{g.reportError({error:{message:"XHR Error: "+n.status,stack:k}})}}return m.apply(n,arguments)};return i.apply(n,l)}}function b(){var i=window.Image;window.Image=function(){var j=new i();j.addEventListener("error",function(k){g.reportError({error:{message:"Image Error",stack:j.src}})});return j}}var e="//baas.im20.com.cn/Api/vml_wx_app/stat_error";function h(l,i,k){var j=document.createElement("script");j.src=e+"?"+f({timestamp:parseInt(new Date().getTime()/1000),baas_action:"create",project_id:g.projectId,message:l,stack:i,is_trusted:k,location:window.location.href,user_agent:navigator.userAgent});document.getElementsByTagName("script")[0].appendChild(j)}function f(j){var i=[];for(var k in j){i.push(k+"="+encodeURIComponent(j[k]))}return i.join("&")}if(typeof define==="function"&&define.amd){define([],function(){return g})}if(typeof exports!=="undefined"){exports.VITest=g}if(typeof window!=="undefined"){window.VITest=g}else{if(typeof global!=="undefined"){global.VITest=g}}})();
