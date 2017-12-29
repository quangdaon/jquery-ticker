export let rafSupported = true;

// Check for Transform Support | Credit: https://stackoverflow.com/questions/7212102/detect-with-javascript-or-jquery-if-css-transform-2d-is-available
export function getSupportedTransform() {
	const prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
	const div = document.createElement('div');
	for (let i = 0; i < prefixes.length; i++) {
		if (div && div.style[prefixes[i]] !== undefined) {
			return prefixes[i];
		}
	}
	return false;
}

// Polyfill for requestAnimationFrame | Credit: https://stackoverflow.com/questions/5605588/how-to-use-requestanimationframe
export const requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback) {
			rafSupported = false;
			window.setTimeout(callback, 1000 / 60);
		};
})();