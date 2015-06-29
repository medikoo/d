'use strict';

var copy           = require('es5-ext/object/copy')
  , ensureCallable = require('es5-ext/object/valid-callable')
  , map            = require('es5-ext/object/map')
  , callable       = require('es5-ext/object/valid-callable')
  , validValue     = require('es5-ext/object/valid-value')

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, resolveContext) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, resolveContext ? resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = Object(arguments[1])
	  , resolveContext;
	if (options.resolveContext != null) resolveContext = ensureCallable(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, resolveContext); });
};
