( function( window, $, _, Backbone, undefined ) {

	"use strict";
	var document = window.document;

	function Post_Customizer() {

		/**
		 * Container for any Views that Post_Customizer will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Collections = {};

		/**
		 * Container for any Models that Post_Customizer will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Models = {};

		/**
		 * Container for any Routers that Post_Customizer will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Routers = {};

		/**
		 * Container for any Views that Post_Customizer will use
		 *
		 * @type {{}}
		 * @private
		 */
		var _Views = {};

		/**
		 * Container for any instance variables we need to store across the entire page.
		 *
		 * @type {{}}
		 * @private
		 */
		var _Instance = {};

		/**
		 * Return anything that we want to expose publicly
		 */
		return {
			Collections : _Collections,
			Models : _Models,
			Routers : _Routers,
			Views : _Views,
			Instance : _Instance
		};
	}

	window.Post_Customizer = new Post_Customizer();

} )( window, jQuery, _, Backbone );