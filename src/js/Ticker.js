/* Ticker Class - Controls each instance of a ticker. */

import { getSupportedTransform } from './helpers';
import brain from './brain';

import logger from './logger';

const log = logger('class');

/* TODO: Port over to private fields
 * - Requires Gulp setup
 **/

export default class Ticker {
	constructor(elem, settings) {
		this.elem = elem;

		this.settings = settings;

		this.__offset = 0;
		this.__pauseTracker = 0;

		this.build();
	}

	build() {
		if (!this.started) {
			this.started = true;

			//region Build Track
			const track = document.createElement('div'); // <div class="js-ticker-track">;
			track.className = 'js-ticker-track';

			this.elem.addClass('js-ticker');
			this.elem.children(this.settings.item).addClass('js-ticker-item').appendTo(track);

			this.elem.append(track);
			//endregion

			//region Init Variables
			this.track = this.elem.find('.js-ticker-track');
			this.__items = this.track.children('.js-ticker-item');

			this.__first = this.__items.first();
			this.__first.attr('data-first', true);
			//endregion

			//region Clone For Scale
			const targetWidth = this.elem.width() + this.__first.width();

			log('(Pre Clones) Target Width: %d, Actual: %d', targetWidth, this.elem[0].scrollWidth);

			while (this.elem[0].scrollWidth < targetWidth) {
				this.__items.each(i => {
					this.track.append(this.__items.eq(i).clone());
				});
			}

			log('(Post Clones) Target Width: %d, Actual: %d', targetWidth, this.elem[0].scrollWidth);
			//endregion

			//region Init Events
			// Insurance to prevent doubling up on enter triggers
			/* FIXME: This looks... un... safe. */
			const initHover = () => {
				this.elem.one('mouseenter', () => {
					this.__pauseTracker++;
					this.elem.one('mouseleave', () => {
						this.__pauseTracker--;
						initHover();
					});
				});
			};

			if (this.settings.pauseOnHover) initHover();

			/* TODO: Pause on focus and reset slider position for ADA
			 * - Also need a solution on keyboard navigation
			 **/
			//endregion

			//region Enable Ticker
			this.elem.addClass('active');
			this.elem.data('ticker', this);

			brain.tickers.push(this);
			//endregion
		}
	}

	advance() {
		this.__width = this.__first.outerWidth();
		if (!this.__pauseTracker) {

			this.__offset += this.settings.speed / brain.fps;

			/* TODO: Need a solution to go in reverse */
			if (this.__offset > this.__width) {
				this.__offset = 0;
				this.__first.appendTo(this.track);
				this.__first = this.track.children('.js-ticker-item').first();
				if (this.settings.pauseAt === 'item' || (this.settings.pauseAt === 'track' && this.__first.data('first'))) {
					this.__pauseTracker++;
					setTimeout(() => this.__pauseTracker--, this.settings.delay);
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