(function (factory) {
	var export_name = 'AutoTest';
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(export_name, ["jquery"], factory);
	} else {
		window[export_name] = factory(jQuery);
	}
}(function ($) {
	var AutoTest = {
		tests: [],
		addTest: function (name, func) {
			var test = new Test(name, func);
			this.tests.push(test);
			return test;
		},
		log: {
			log: function (log) {
				return $('<div class="log"></div>').html(log).appendTo('#autoTestLog');
			},
			info: function (log) {
				this.log(log).addClass('info');
			},
			succ: function (log) {
				this.log('<i class="fa fa-check"></i>' + log).addClass('succ');
			},
			fail: function (log) {
				this.log('<i class="fa fa-close"></i>' + log).addClass('fail');
			},
			warn: function (log) {
				this.log('<i class="fa fa-warning"></i>' + log).addClass('warn');
			},
			rect: function (log) {
				this.log(log).addClass('rect');
			}
		},
		start: function () {
			this.log.info('====== AutoTest Start ! ======');
			this.testNext();
		},
		end: function () {
			this.log.info('====== AutoTest End !   ======');
		},
		testNext: function () {
			var test = this.tests.shift();
			if (test) {
				test.start();
			} else {
				this.end();
			}
		}
	};

	function Test(name, testFunc) {
		if (!name || typeof testFunc != 'function') {
			throw new Error('The test must have a name and a test function!');
		}
		this.name = name;
		this.testFunc = testFunc;
	}

	Test.prototype = {
		name: null,
		testFunc: null,
		start: function () {
			AutoTest.log.log('--- "' + this.name + '" test start ! ---');
			this.testFunc();
		},
		end: function () {
			AutoTest.log.log('--- "' + this.name + '" test end ! ---');
			AutoTest.testNext();
		}
	};

	return AutoTest;
}));