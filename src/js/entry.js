/**
 * Small jQuery Plugin create by Quangdao Nguyen
 */

import defaultOptions from './defaults';
import brain from './brain';
import Ticker from './Ticker';

import logger from './logger';

const log = logger('entry');

(function ($) {
	'use strict';
	if (!$) return console.warn('Whoa there, buddy! Looks like you included the jQuery Ticker plugin without including jQuery first.');

	$.ticker = function (elem, settings) {
		return new Ticker($(elem), settings);
	};

	$.fn.ticker = function (overrides = {}) {
		return this.each(function () {
			$.ticker(this, $.extend(true, {}, defaultOptions, overrides));
		});
	};

	brain.init($);
})(typeof jQuery !== 'undefined' ? jQuery : null);