$(function () {
	AutoTest.log.rect(window.navigator.userAgent);
	AutoTest.log.rect(window.location.href);

	AutoTest.addTest('Collecting Errors', function () {
		var self = this;

		AutoTest.log.log('Start collecting errors.');

		AutoTest.log.log('run script: "xyz * abc"');
		AutoTest.log.info('Please visit <a href="./admin.html">the admin page of VITest</a>, and check the result.');
		self.end();
		setTimeout(function () {
			var img = document.createElement('img');
			img.src = './123';
			document.body.appendChild(img);
		}, 1000);
		// setTimeout(func, 1000);

		function func() {
			$.ajax({
				// url: 'http://www.baidu.com',
				url: './js/endfile2.js',
				type: 'get',
				dataType: 'text',
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