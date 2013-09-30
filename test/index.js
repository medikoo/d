'use strict';

module.exports = {
	'': require('./d'),
	"Auto bind": function (t, a) {
		return require('./auto-bind')(t.autoBind, a);
	},
	"Lazy": function (t, a) {
		return require('./lazy')(t.lazy, a);
	}
};
