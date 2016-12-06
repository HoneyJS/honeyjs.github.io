$(function () {
	if ($('.section-3 .content .reward-ctnr').length > 3) {
		$('.section-3 .content').height(
			$('.section-3 .content .reward-ctnr').eq(2).position().top + $('.section-3 .content .reward-ctnr').eq(2).outerHeight()
		);
	} else {
		$('.section-3 .see-more').hide();
	}

	if ($('.section-4 .content .case-ctnr').length > 6) {
		$('.section-4 .content').height(
			$('.section-4 .content .case-ctnr').eq(5).position().top + $('.section-4 .content .case-ctnr').eq(5).outerHeight()
		);
	} else {
		$('.section-4 .see-more').hide();
	}

	$('.see-more').on('click', function () {
		var $section = $(this).parent();
		var $last = $section.find('.content').children(':last');
		$section.find('.content').height($last.position().top + $last.outerHeight());
		$(this).fadeOut();
	});
});