# D - Property descriptor factory

_Originally derived from [es5-ext](https://github.com/medikoo/es5-ext) package._

Defining properties with descriptors is very verbose:

```javascript
var Account = function () {};
Object.defineProperties(Account.prototype, {
  deposit: { value: function () {
      /* ... */
    }, configurable: true, enumerable: false, writable: true },
  whithdraw: { value: function () {
      /* ... */
    }, configurable: true, enumerable: false, writable: true },
  balance: { get: function () {
      /* ... */
    }, configurable: true, enumerable: false }
});
```

D cuts that to:

```javascript
var d = require('d');

var Account = function () {};
Object.defineProperties(Account.prototype, {
  deposit: d(function () {
    /* ... */
  }),
  whithdraw: d(function () {
    /* ... */
  }),
  balance: d.gs(function () {
    /* ... */
  })
});
```

By default, created descriptor follow characteristics of native ES5 properties, and defines values as:

```javascript
{ configurable: true, enumerable: false, writable: true }
```

You can overwrite it by preceding _value_ argument with instruction:
```javascript
d('c', value); // { configurable: true, enumerable: false, writable: false }
d('ce', value); // { configurable: true, enumerable: true, writable: false }
d('e', value); // { configurable: false, enumerable: true, writable: false }

// Same way for get/set:
d.gs('e', value); // { configurable: false, enumerable: true }
```

## Installation
### NPM

In your project path:

	$ npm install d

### Browser

You can easily bundle _D_ for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Tests [![Build Status](https://travis-ci.org/medikoo/d.png)](https://travis-ci.org/medikoo/d)

	$ npm test
