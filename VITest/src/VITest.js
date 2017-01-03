/*!
 *  VITest.js v0.1.0103
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */

(function() {

	'use strict';

	'http://baas.im20.com.cn/Api/vml_wx_app/stat_test?baas_JSONP=imCallback&baas_action=create&project_id=1&username=&desc=test&datetime=2016-12-12 12:00:00'

	// Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	if (typeof define === 'function' && define.amd) {
		define([], function() {
			return {
				Howler: Howler,
				Howl: Howl
			};
		});
	}

	// Add support for CommonJS libraries such as browserify.
	if (typeof exports !== 'undefined') {
		exports.Howler = Howler;
		exports.Howl = Howl;
	}

	// Define globally in case AMD is not available or unused.
	if (typeof window !== 'undefined') {
		window.HowlerGlobal = HowlerGlobal;
		window.Howler = Howler;
		window.Howl = Howl;
		window.Sound = Sound;
	} else if (typeof global !== 'undefined') { // Add to global in Node.js (for testing, etc).
		global.HowlerGlobal = HowlerGlobal;
		global.Howler = Howler;
		global.Howl = Howl;
		global.Sound = Sound;
	}

})();