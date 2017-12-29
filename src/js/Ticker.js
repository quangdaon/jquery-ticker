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

		this.__first = this.track.children('.js-ticker-item').first();

		log(brain.tickers);
		brain.tickers.push(this);
		log(brain.tickers);
	}

	advance() {
		this.__width = this.__first.outerWidth();
		if (!this.elem.is(':hover') || !this.settings.pauseOnHover) {

			this.__offset += this.settings.speed / brain.getFps();

			if (this.__offset > this.__width) {
				this.__offset = 0;
				this.__first.appendTo(this.track);
				this.__first = this.track.children('.js-ticker-item').first();
			}

			const transformProp = getSupportedTransform();

			if (transformProp) {
				this.track.css(transformProp, 'translateX(-' + (this.__offset) + 'px)');
			} else {
				this.track.css('left', '-' + (this.__offset) + 'px');
			}
		}
	}

	static get version() {
		return '|VERSION|';
	}
}