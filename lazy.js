'use strict';

var map        = require('es5-ext/object/map')
  , callable   = require('es5-ext/object/valid-callable')
  , validValue = require('es5-ext/object/valid-value')
  , contains   = require('es5-ext/string/#/contains')

  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , cacheDesc = { configurable: false, enumerable: false, writable: false,
		value: null }
  , define;

define = function (name, options) {
	var value, dgs, cacheName, desc, writable = false;
	options = Object(validValue(options));
	cacheName = options.cacheName;
	if (cacheName == null) cacheName = name;
	delete options.cacheName;
	value = callable(options.value);
	delete options.value;
	dgs = { configurabe: Boolean(options.configurable),
		enumerable: Boolean(options.enumerable) };
	dgs.get = (name !== cacheName) ? function () {
		if (hasOwnProperty.call(this, cacheName)) return this[cacheName];
		cacheDesc.value = value.call(this, options);
		cacheDesc.writable = writable;
		defineProperty(this, cacheName, cacheDesc);
		cacheDesc.value = null;
		if (desc) defineProperty(this, name, desc);
		return this[cacheName];
	} : function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = value.call(this, options);
		defineProperty(this, name, desc);
		desc.value = null;
		return this[name];
	};
	dgs.set = function (value) {
		dgs.get.call(this);
		this[cacheName] = value;
	};
	if (options.desc) {
		desc = {
			configurable: contains.call(options.desc, 'c'),
			enumerable: contains.call(options.desc, 'e')
		};
		if (cacheName === name) {
			desc.writable = contains.call(options.desc, 'w');
			desc.value = null;
		} else {
			writable = contains.call(options.desc, 'w');
			desc.get = dgs.get;
			desc.set = dgs.set;
		}
		delete options.desc;
	} else if (cacheName === name) {
		desc = {
			configurable: Boolean(options.configurable),
			enumerable: Boolean(options.enumerable),
			writable: Boolean(options.writable),
			value: null
		};
	}
	delete options.configurable;
	delete options.enumerable;
	delete options.writable;
	return dgs;
};

module.exports = function (props) {
	return map(props, function (desc, name) { return define(name, desc); });
};
