/*!
 *  VITest.js v0.4.0104
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */
!function(){"use strict";function d(a,d,f){var g=new Image;g.src=c+"?"+e({timestamp:parseInt((new Date).getTime()/1e3),baas_action:"create",project_id:b.projectId,message:a,stack:d,is_trusted:f,location:window.location.href,user_agent:navigator.userAgent})}function e(a){var c,b=[];for(c in a)b.push(c+"="+encodeURIComponent(a[c]));return b.join("&")}var a={message:"UNKNOWN_ERROR",stack:""},b={projectId:null,errors:[],init:function(a){this.projectId=a,window.VITestErrors&&VITestErrors.length&&VITestErrors.forEach(function(a){b.reportError(a)}),this.collectError()},collectError:function(){window.addEventListener("error",function(a){b.reportError(a)})},reportError:function(b){var c=b.error;c&&c.message||(c=a),this.errors.indexOf(c.stack)>=0||(this.errors.push(c.stack),d(c.message,c.stack,b.isTrusted))}},c="//baas.im20.com.cn/Api/vml_wx_app/stat_error";"function"==typeof define&&define.amd&&define([],function(){return b}),"undefined"!=typeof exports&&(exports.VITest=b),"undefined"!=typeof window?window.VITest=b:"undefined"!=typeof global&&(global.VITest=b)}();