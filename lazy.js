'use strict';

var copy       = require('es5-ext/object/copy')
  , map        = require('es5-ext/object/map')
  , callable   = require('es5-ext/object/valid-callable')
  , validValue = require('es5-ext/object/valid-value')
  , contains   = require('es5-ext/string/#/contains')

  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , cacheDesc = { configurable: false, enumerable: false, writable: false,
		value: null }
  , define;

define = function (name, desc) {
	var value, dgs, cacheName = desc.cacheName, expose;
	validValue(desc);
	value = callable(desc.value);
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	if (cacheName == null) cacheName = name;
	dgs.get = function () {
		if (name !== cacheName) {
			if (hasOwnProperty.call(this, cacheName)) return this[cacheName];
			cacheDesc.value = value.call(this);
			defineProperty(this, cacheName, cacheDesc);
			cacheDesc.value = null;
			if (expose) defineProperty(this, name, desc);
			return this[cacheName];
		}
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = value.call(this);
		defineProperty(this, name, desc);
		desc.value = null;
		return this[name];
	};
	if (!desc.desc) return dgs;
	desc = {
		configurable: contains.call(desc.desc, 'c'),
		enumerable: contains.call(desc.desc, 'e'),
		writable: contains.call(desc.desc, 'w')
	};
	if (cacheName === name) {
		desc.value = null;
	} else {
		delete desc.writable;
		desc.get = dgs.get;
	}
	expose = true;
	return dgs;
};

module.exports = function (props) {
	return map(props, function (desc, name) { return define(name, desc); });
};
