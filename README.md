# D - Property descriptor factory for ECMAScript

_Originally derived from [es5-ext](https://github.com/medikoo/es5-ext) package._

Defining properties with descriptors is very verbose:

```javascript
var Account = function () {};
Object.defineProperties(Account.prototype, {
  deposit: { value: function () {
      /* ... */
    }, enumerable: false, writable: true, configurable: true },
  whithdraw: { value: function () {
      /* ... */
    }, enumerable: false, writable: true, configurable: true },
  balance: { get: function () {
      /* ... */
    }, enumerable: false, writable: true }
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

By default created descriptor follows characteristics of native ES5 properties, and defines values as:

```json
{ enumerable: false, configurable: true, writable: true }
```

You can overwrite it, preceding value argument with instruction:
```javascript
d('c', value); // { enumerable: false, writable: false, configurable: true }
d('ec', value); // { enumerable: true, writable: false, configurable: true }
d('e', value); // { enumerable: true, writable: false, configurable: false }

// Same way for get/set:

d.gs('e', value); // { enumerable: true, configurable: false }
``

## Installation
### NPM

In your project path:

	$ npm install d

### Browser

You can easily bundle _D_ for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Tests [![Build Status](https://travis-ci.org/medikoo/d.png)](https://travis-ci.org/medikoo/d)

	$ npm test
