export default {
	// String: Selector to indicate each ticker item. Must be a direct child of the ticker element
	item: 'div',

	// Boolean: Toggles whether the ticker should pause if the mouse cursor is over it
	pauseOnHover: false,

	// Number: Speed of ticker in Pixels/Second.
	speed: 60,

	// String: (track|item) Sets whether ticker breaks when it hits a new item or if the track has reset
	pauseOn: '',

	// Number: Pause duration for pauseOn
	delay: 500
};