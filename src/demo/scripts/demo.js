$('.default-ticker').ticker();

var newsTicker = $('.news').ticker({
	speed: 120,
	pauseOnHover: true,
	item: '.news-item'
}).data('ticker');

$('#news-toggle').on('click', function () {
	newsTicker.toggle();
});

$('.speed-test').each(function () {
	$(this).ticker({
		speed: $(this).data('speed') || 60
	});
});
