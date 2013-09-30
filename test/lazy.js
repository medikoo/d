'use strict';

var d = require('../d');

module.exports = function (t, a) {
	var Foo = function () {}, i = 1, o;
	Object.defineProperties(Foo.prototype, t({
		bar: d(function () { return ++i; }),
		bar2: d(function () { return this.bar + 23; })
	}));

	o = new Foo();
	a.deep([o.bar, o.bar2], [2, 25]);
};
