# jQuery News Ticker Plugin

In Development. Do not use.

### But if you insist...

Well, you're insisting on using a developmental library, so I'm assuming you're a developer and know how to install a jQuery plugin. So I'm just going to skip straight to usage.

You can use this just like any other jQuery plugin:

```javascript
$('.my-elem').ticker([options]);
```

Here are your [settings](src/js/defaults.js).

```javascript
export default {
	// String: Selector to indicate each ticker item. Must be a direct child of the ticker element
	item: 'div',

	// Boolean: Toggles whether the ticker should pause if the mouse cursor is over it
	pauseOnHover: false,

	// Number: Speed of ticker in Pixels/Second.
	speed: 60,

	// String: (track|item) Sets whether ticker breaks when it hits a new item or if the track has reset
	pauseAt: '',

	// Number: Pause duration for pauseAt
	delay: 500
};
```

Files are in [`dist`](dist). Knock yourself out.

### Oh, now you want a demo too?

Well, that's a shame, ain't it?

<sub><strong>Disclaimer:</strong>  I'm not actually this mean or obnoxious. This was meant as a joke. Like I said, it's in development so I didn't want to put much effort into writing any docs yet, in case things change.</sub>
