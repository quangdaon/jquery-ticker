$('.default-ticker').ticker();
$('.speed-test').each(function () {
	$(this).ticker({
		speed: $(this).data('speed') || 60
	});
});
