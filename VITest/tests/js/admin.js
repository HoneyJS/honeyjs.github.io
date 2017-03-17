$(function () {
	var admin = {
		init: function () {
			$(window).on('hashchange', function () {
				if (window.location.hash == '') {
					admin.showProjectList();
				} else {
					admin.showProjectErrorList(window.location.hash.substr(2));
				}
			});
			$(window).trigger('hashchange');
		},
		showProjectList: function () {
			$('#main>*').hide();
			VITestAdmin.getProjectList(function (projects) {
				var $template = $('#projects').show().children().remove().eq(0);
				for (var cid in projects) {
					var project = projects[cid];
					var $project = $template.clone();
					$project.find('.name').text(cid);
					$project.find('a.project').attr('href', '#/' + cid);
					$project.find('.stat .error .content').text(project.total);
					$project.find('.stat .first .content').text(project.first_time);
					$project.find('.stat .last .content').text(project.last_time);
					$('#projects').append($project);
				}
			});
		},
		showProjectErrorList: function (cid) {
			$('#main>*').hide();
			VITestAdmin.getProjectErrorList({
				cid: cid,
				order: 1
			}, function (list) {
				var $template = $('#table').show().children().remove().eq(0);
				list.forEach(function (error) {
					var $error = $template.clone();
					$error.find('.time .content').text(error.create_date);
					$error.find('.error .content').text(error.error);
					$error.find('.link .content').text(error.link);
					$error.find('.ua .content').text(error.ua);
					$error.find('.stack .content').text(error.stack);
					$('#table').append($error);
				});
				// $('#table').show();
				// $('#table table tbody').empty();
				// list.forEach(function (error) {
				// 	var $tr = $('<tr>');
				// 	$tr.append('<td>' + error.create_date + '</td>');
				// 	$tr.append('<td class="err">' + error.error + '</td>');
				// 	$tr.append('<td><div>UA: ' + error.ua + '</div><div>Link: ' + error.link + '</div><div>Stack: ' + error.stack + '</div></td>');
				// 	$tr.appendTo('#table table tbody');
				// });
			});
		}
	};

	admin.init();
});