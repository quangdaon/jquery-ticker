/* This is where the magic happens */
import { rafSupported, requestAnimFrame } from './helpers';

import logger from './logger';

const log = logger('brain');

const FPSs = [60];

const tickers = [];

export default {
	getFps() {
		//return 60;
		if (!rafSupported) return 60;
		const l = FPSs.length;
		return FPSs.reduce(function (a, b) {
			return a + b;
		}) / l;
	},
	get tickers() {
		return tickers;
	},
	init($) {
		let frameCount = 0;
		let fpsInterval = 0;

		requestAnimFrame(function tick() {
			frameCount++;
			if (tickers.length) tickers.forEach(t => t.advance());

			requestAnimFrame(tick);
		});

		// Monitor fps
		if (rafSupported) {
			let fpsMon;
			$(window).on('load focus', function () {
				log('Frame Count: %d, FPS Interval: %d', frameCount, fpsInterval);
				if (!fpsMon) {
					fpsInterval = frameCount;
					fpsMon = setInterval(function () {
						FPSs.push(frameCount - fpsInterval);

						while (FPSs.length > 10) FPSs.shift();

						log(FPSs);

						fpsInterval = frameCount;
					}, 1000);
				}
			}).on('blur', function () {
				clearInterval(fpsMon);

				fpsMon = null;
			});
		}

	}
};