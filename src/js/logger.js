// Doing it this way to remove logging code from production entirely.

module.exports = function logger(location) {
	if ('|ENV|' === 'development') {
		const debug = require('debug');

		debug.enable('ticker:*');

		return debug(`ticker:${location}`);
	} else {
		return () => {
		};
	}
};