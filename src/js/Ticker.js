import { getSupportedTransform } from './helpers';
import brain from './brain';

import logger from './logger';

const log = logger('class');

export default class Ticker {
	constructor(elem, settings) {
		this.elem = elem;

		this.track = this.elem.find('.js-ticker-track');

		this.settings = settings;

		this.__offset = 0;

		this.build();
	}

	build() {
		if (!this.started) {
			this.started = true;
			this.__items = this.track.children('.js-ticker-item');

			this.__first = this.__items.first();
			this.__first.attr('data-first', true);

			const targetWidth = this.elem.width() + this.__first.width();

			log('(Pre Clones) Target Width: %d, Actual: %d', targetWidth, this.elem[0].scrollWidth);

			while (this.elem[0].scrollWidth < targetWidth) {
				this.__items.each(i => {
					this.track.append(this.__items.eq(i).clone());
				});
			}

			log('(Post Clones) Target Width: %d, Actual: %d', targetWidth, this.elem[0].scrollWidth);

			this.elem.addClass('active');

			brain.tickers.push(this);
		}
	}

	advance() {
		this.__width = this.__first.outerWidth();
		if (!this.paused && (!this.elem.is(':hover') || !this.settings.pauseOnHover)) {

			this.__offset += this.settings.speed / brain.fps;

			if (this.__offset > this.__width) {
				this.__offset = 0;
				this.__first.appendTo(this.track);
				this.__first = this.track.children('.js-ticker-item').first();
				if (this.settings.pauseOn === 'item' || (this.settings.pauseOn === 'track' && this.__first.data('first'))) {
					this.paused = true;
					setTimeout(() => this.paused = false, this.settings.delay);
				}
			}

			const transformProp = getSupportedTransform();

			if (transformProp) {
				this.track.css(transformProp, 'translateX(' + (-this.__offset) + 'px)');
			} else {
				this.track.css('left', (-this.__offset) + 'px');
			}
		}
	}

	static get version() {
		return '|VERSION|';
	}
}