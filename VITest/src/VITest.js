/*!
 *  VITest.js v0.7.3.0315
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
			if (window.VITestErrors && VITestErrors.length) {
				VITestErrors.forEach(function (e) {
					VITest.reportError(e);
				});
			}
			listenError();
			mockAjax();
			// mockImage(); // do not mock Image anymore
		},
		reportError: function (e) {
			var error = e.error;
			if (!error && !e.message) error = UNKNOWN_ERROR;
			var errMsg = (error && error.message) || e.message;
			var errStack = (error && error.stack) || e.message;
			if (this.errors.length >= 5) return;
			if (this.errors.indexOf(errStack) >= 0) return; // avoid reporting the same error that has been reported
			this.errors.push(errStack);
			reportError(errMsg, errStack, e.isTrusted);
		},
		__callback: function () {
		}
	};

	/**
	 * listen error on window
	 * @private
	 */
	function listenError() {
		window.addEventListener('error', function (e) {
			VITest.reportError(e);
		});
	}

	/**
	 * mock ajax request
	 * reference from vConsole
	 * @private
	 */
	function mockAjax() {
		var _XMLHttpRequest = window.XMLHttpRequest;
		if (!_XMLHttpRequest) return;

		var _open = window.XMLHttpRequest.prototype.open;

		// mock open()
		window.XMLHttpRequest.prototype.open = function () {
			var XMLReq = this;
			var args = [].slice.call(arguments),
				url = args[1];

			// mock onreadystatechange
			var _onreadystatechange = XMLReq.onreadystatechange || function () {
				};
			XMLReq.onreadystatechange = function () {
				if (XMLReq.readyState == 4) {
					if ((XMLReq.status >= 200 && XMLReq.status < 300 ) || XMLReq.status == 304) {
						// normal
					} else {
						// error
						VITest.reportError({
							error: {
								message: 'XHR Error: ' + XMLReq.status,
								stack: url
							}
						});
					}
				}
				return _onreadystatechange.apply(XMLReq, arguments);
			};

			return _open.apply(XMLReq, args);
		};
	}

	/**
	 * mock Image
	 * @private
	 */
	function mockImage() {
		var _Image = window.Image;
		window.Image = function () {
			var img = new _Image();
			img.addEventListener('error', function (e) {
				VITest.reportError({
					error: {
						message: 'Image Error',
						stack: img.src
					}
				});
			});
			return img;
		};
	}

	var reportErrorUrl = '//baastest.im20.com.cn/Api/PublicApi/submitVtest';

	/**
	 * report error to server
	 * @param message {string}
	 * @param stack {string}
	 * @param isTrusted {string}
	 * @private
	 */
	function reportError(message, stack, isTrusted) {
		// if (window.location.hostname == 'localhost') return; // don't report error in localhost environment
		var script = document.createElement('script');
		script.src = reportErrorUrl + '?' + params({
				imCallback: 'VITest.__callback',
				// timestamp: parseInt(new Date().getTime() / 1000),
				// baas_action: 'create',
				cid: VITest.projectId,
				error: message,
				stack: stack,
				// is_trusted: isTrusted,
				link: window.location.href,
				ua: navigator.userAgent
			});
		document.getElementsByTagName('script')[0].appendChild(script);
	}

	/**
	 * translate params object to string
	 * @param data {object}
	 * @returns {string}
	 * @private
	 */
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