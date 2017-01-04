$(function () {
	AutoTest.log.rect(window.navigator.userAgent);
	AutoTest.log.rect(window.location.href);

	AutoTest.addTest('Collecting Errors', function () {
		var self = this;

		AutoTest.log.log('Start collecting errors.');

		AutoTest.log.log('run script: "xyz * abc"');
		AutoTest.log.info('Please visit <a href="./admin.html">the admin page of VITest</a>, and check the result.');
		self.end();
		setTimeout(func, 100);

		function func() {
			xyz * abc
		}
	});

	AutoTest.start();
});