( function( window, $, _, Backbone, undefined ) {

	"use strict";
	var document = window.document;

	function Scrivener() {

		/**
		 * Container for any Views that Scrivener will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Collections = {};

		/**
		 * Container for any Models that Scrivener will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Models = {};

		/**
		 * Container for any Routers that Scrivener will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Routers = {};

		/**
		 * Container for any Views that Scrivener will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Views = {};

		/**
		 * Return anything that we want to expose publicly
		 */
		return {
			Collections : _Collections,
			Models : _Models,
			Routers : _Routers,
			Views : _Views
		};
	}

	window.Scrivener = new Scrivener();

} )( window, jQuery, _, Backbone );