$('.default-ticker').ticker();

$('.news').ticker({
	speed: 120,
	pauseOnHover: true,
	item: '.news-item'
});

$('.speed-test').each(function () {
	$(this).ticker({
		speed: $(this).data('speed') || 60
	});
});
