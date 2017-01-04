/*!
 *  VITest.js v0.2.0104
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */
!function(){"use strict";function d(a,d,e,g){var h=new Image;h.src=c+"?"+f({timestamp:parseInt((new Date).getTime()/1e3),baas_action:"create",project_id:b.projectId,message:a,stack:d,time:parseInt(e),is_trusted:g,user_agent:navigator.userAgent})}function e(a){window.imCallback=a;var b=document.createElement("script");b.type="text/javascript",b.src=c+"?"+f({baas_JSONP:"imCallback",baas_action:"sort",baas_sort_field:"timestamp",baas_sort_type:"desc"}),document.head.appendChild(b)}function f(a){var c,b=[];for(c in a)b.push(c+"="+encodeURIComponent(a[c]));return b.join("&")}var a={message:"UNKNOWN_ERROR",stack:""},b={projectId:null,errors:[],init:function(a){this.projectId=a,this.collectError(),window.VITestErrors&&VITestErrors.length&&VITestErrors.forEach(function(a){b.reportError(a)})},collectError:function(){window.addEventListener("error",function(a){b.reportError(a)})},reportError:function(b){var c=b.error;c&&c.message||(c=a),this.errors.indexOf(c.stack)>=0||d(c.message,c.stack,b.timeStamp,b.isTrusted)},getErrors:e},c="http://baas.im20.com.cn/Api/vml_wx_app/stat_error";"function"==typeof define&&define.amd&&define([],function(){return b}),"undefined"!=typeof exports&&(exports.VITest=b),"undefined"!=typeof window?window.VITest=b:"undefined"!=typeof global&&(global.VITest=b)}();