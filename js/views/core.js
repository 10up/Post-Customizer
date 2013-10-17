( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.Core = Backbone.View.extend( {

		el : function() {
			return document.querySelector( '#preview-action a' );
		},

		initialize : function() {
			//
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );