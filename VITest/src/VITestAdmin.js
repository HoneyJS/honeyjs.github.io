/*!
 *  VITestAdminAdmin.js
 *
 *  based on jQuery.ajax
 *
 *  yinghao.liu@vmlim20.com.cn
 *
 *  MIT License
 */

(function () {

	'use strict';

	var VITestAdmin = {
		getProjectList: function (success, fail) {
			$.ajax({
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'imCallback',
				url: 'http://baastest.im20.com.cn/Api/PublicApi/getVtestSta',
				success: function (res) {
					console.log(res)
					if (res.errorcode) {
						fail && fail(res);
					} else {
						success(res.data);
					}
				}
			});
		},
		/**
		 * vtest数据显示接口
		 * @param data
		 cid      （必需，不填就显示所有)
		 search    (可选，ua模糊查询关键字)
		 order     (可选，0或为时间正排序，1为时间倒排序)
		 page      (可选，默认为0，0为第一页)
		 perpage   (可选，每页数量，默认为50)
		 * @param success
		 * @param fail
		 */
		getProjectErrorList: function (data, success, fail) {
			$.ajax({
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'imCallback',
				url: 'http://baastest.im20.com.cn/Api/PublicApi/getVtestSta?cid='+data.cid,
				success: function (res) {
				}
			});
			$.ajax({
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'imCallback',
				url: 'http://baastest.im20.com.cn/Api/PublicApi/getVtest',
				data: data,
				success: function (res) {
					console.log(res)
					if (res.errorcode) {
						fail && fail(res);
					} else {
						success(res.data);
					}
				}
			});
		}
	};

	// Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return VITestAdmin;
		});
	}

	// Add support for CommonJS libraries such as browserify.
	if (typeof exports !== 'undefined') {
		exports.VITestAdmin = VITestAdmin;
	}

	// Define globally in case AMD is not available or unused.
	if (typeof window !== 'undefined') {
		window.VITestAdmin = VITestAdmin;
	} else if (typeof global !== 'undefined') { // Add to global in Node.js (for testing, etc).
		global.VITestAdmin = VITestAdmin;
	}

})();