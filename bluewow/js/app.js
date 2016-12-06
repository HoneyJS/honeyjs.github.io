$(function () {
	if ($('.section-3 .content .reward-ctnr').length > 3) {
		$('.section-3 .content').height(
			$('.section-3 .content .reward-ctnr').eq(2).position().top + $('.section-3 .content .reward-ctnr').eq(2).outerHeight()
		);
	} else {
		$('.section-3 .see-more').hide();
	}

	var length4 = 6;
	if (innerWidth <= 640) {
		length4 = 2;
	}
	if ($('.section-4 .content .case-ctnr').length > length4) {
		var $last = $('.section-4 .content .case-ctnr').eq(length4 - 1);
		$('.section-4 .content').height(
			$last.position().top + $last.outerHeight()
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