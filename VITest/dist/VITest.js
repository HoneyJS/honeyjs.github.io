/*!
 *  VITest.js v0.5.0105
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */
(function(){var a={message:"UNKNOWN_ERROR",stack:""};var d={projectId:null,errors:[],init:function(f){this.projectId=f;if(window.VITestErrors&&VITestErrors.length){VITestErrors.forEach(function(g){d.reportError(g)})}this.collectError()},collectError:function(){window.addEventListener("error",function(f){d.reportError(f)})},reportError:function(i){console.log(i);var g=i.error;if(!g&&!i.message){g=a}var h=(g&&g.message)||i.message;var f=(g&&g.stack)||i.message;if(this.errors.indexOf(g.stack)>=0){return}this.errors.push(f);e(h,f,i.isTrusted)}};var b="//baas.im20.com.cn/Api/vml_wx_app/stat_error";function e(i,f,h){var g=new Image();g.src=b+"?"+c({timestamp:parseInt(new Date().getTime()/1000),baas_action:"create",project_id:d.projectId,message:i,stack:f,is_trusted:h,location:window.location.href,user_agent:navigator.userAgent})}function c(g){var f=[];for(var h in g){f.push(h+"="+encodeURIComponent(g[h]))}return f.join("&")}if(typeof define==="function"&&define.amd){define([],function(){return d})}if(typeof exports!=="undefined"){exports.VITest=d}if(typeof window!=="undefined"){window.VITest=d}else{if(typeof global!=="undefined"){global.VITest=d}}})();
