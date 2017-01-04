/*!
 *  VITest.js v0.2.0104
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */

(function () {

	'use strict';

	var UNKNOWN_ERROR = {
		message: 'UNKNOWN_ERROR',
		stack: ''
	};

	var VITest = {
		projectId: null,
		errors: [],
		init: function (projectId) {
			this.projectId = projectId;
			this.collectError();
			if (window.VITestErrors && VITestErrors.length) {
				VITestErrors.forEach(function (e) {
					VITest.reportError(e);
				});
			}
		},
		collectError: function () {
			window.addEventListener('error', function (e) {
				VITest.reportError(e);
			});
		},
		reportError: function (e) {
			var error = e.error;
			if (!error || !error.message) error = UNKNOWN_ERROR;
			if (this.errors.indexOf(error.stack) >= 0) return; // avoid reporting the same error that has been reported
			reportError(error.message, error.stack, e.timeStamp, e.isTrusted);
		},
		getErrors: getErrors
	};

	var reportErrorUrl = 'http://baas.im20.com.cn/Api/vml_wx_app/stat_error';

	function reportError(message, stack, timestamp, isTrusted) {
		var img = new Image();
		img.src = reportErrorUrl + '?' + params({
				timestamp: parseInt(new Date().getTime() / 1000),
				baas_action: 'create',
				project_id: VITest.projectId,
				message: message,
				stack: stack,
				time: parseInt(timestamp),
				is_trusted: isTrusted,
				user_agent: navigator.userAgent
			});
	}

	function getErrors(callback) {
		window.imCallback = callback;
		var script = document.createElement('script');
		script.src = reportErrorUrl + '?' + params({
				baas_JSONP: 'imCallback',
				baas_action: 'sort',
				baas_sort_field: 'timestamp',
				baas_sort_type: 'desc'
			});
		document.head.appendChild(script);
	}

	function params(data) {
		var arr = [];
		for (var param in data) {
			arr.push(param + '=' + encodeURIComponent(data[param]));
		}
		return arr.join('&');
	}

	// Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return VITest;
		});
	}

	// Add support for CommonJS libraries such as browserify.
	if (typeof exports !== 'undefined') {
		exports.VITest = VITest;
	}

	// Define globally in case AMD is not available or unused.
	if (typeof window !== 'undefined') {
		window.VITest = VITest;
	} else if (typeof global !== 'undefined') { // Add to global in Node.js (for testing, etc).
		global.VITest = VITest;
	}

})();