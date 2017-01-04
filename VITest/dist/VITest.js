/*!
 *  VITest.js v0.4.0104
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */
(function(){var a={message:"UNKNOWN_ERROR",stack:""};var d={projectId:null,errors:[],init:function(f){this.projectId=f;if(window.VITestErrors&&VITestErrors.length){VITestErrors.forEach(function(g){d.reportError(g)})}this.collectError()},collectError:function(){window.onerror=function(h,i,j,g,f){d.reportError({error:{message:h,stack:i+":"+j+":"+g},isTrusted:true})}},reportError:function(g){console.log(g);var f=g.error;if(!f||!f.message){f=a}if(this.errors.indexOf(f.stack)>=0){return}this.errors.push(f.stack);e(f.message,f.stack,g.isTrusted)}};var b="//baas.im20.com.cn/Api/vml_wx_app/stat_error";function e(i,f,h){var g=new Image();g.src=b+"?"+c({timestamp:parseInt(new Date().getTime()/1000),baas_action:"create",project_id:d.projectId,message:i,stack:f,is_trusted:h,location:window.location.href,user_agent:navigator.userAgent})}function c(g){var f=[];for(var h in g){f.push(h+"="+encodeURIComponent(g[h]))}return f.join("&")}if(typeof define==="function"&&define.amd){define([],function(){return d})}if(typeof exports!=="undefined"){exports.VITest=d}if(typeof window!=="undefined"){window.VITest=d}else{if(typeof global!=="undefined"){global.VITest=d}}})();