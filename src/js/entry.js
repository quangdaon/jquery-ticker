/**
 * Small jQuery Plugin create by Quangdao Nguyen
 */

import defaultOptions from './defaults';
import brain from './brain';
import Ticker from './Ticker';

import debug from 'debug';

const log = debug('ticker:entry');

if ('|ENV|' === 'development') {
	debug.enable('ticker:*');
} else {
	debug.disable('ticker:*');
}

log('|ENV|');

(function ($) {
	'use strict';
	if (!$) return console.warn('Whoa there, buddy! Looks like you included the jQuery Ticker plugin without including jQuery first.');

	$.ticker = Ticker;

	$.fn.ticker = function (overrides) {
		const settings = $.extend(true, {}, defaultOptions, overrides);

		return this.each(function () {
			const $ticker = $(this);
			const $track = $('<div class="js-ticker-track">');

			$ticker.append($track);

			$ticker.addClass('js-ticker');
			$ticker.children(settings.item).addClass('js-ticker-item').appendTo($track);

			let ticker = new $.ticker($ticker, settings);
			$(this).data('ticker', ticker);
		});
	};

	brain.init($);
})(typeof jQuery !== 'undefined' ? jQuery : null);