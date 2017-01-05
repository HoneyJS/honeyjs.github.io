$(function () {
	AutoTest.log.rect(window.navigator.userAgent);
	AutoTest.log.rect(window.location.href);

	AutoTest.addTest('Collecting Errors', function () {
		var self = this;

		AutoTest.log.log('Start collecting errors.');

		AutoTest.log.log('run script: "xyz * abc"');
		AutoTest.log.info('Please visit <a href="./admin.html">the admin page of VITest</a>, and check the result.');
		self.end();
		setTimeout(func, 1000);

		function func() {
			$.ajax({
				// url: 'http://www.baidu.com',
				url: './js/endfile.js',
				type: 'get',
				dataType: 'script',
				success: function () {

				},
				fail: function () {
					throw new Error('script error');
				}
			});
		}
	});

	AutoTest.start();
});