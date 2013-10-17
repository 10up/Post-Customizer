( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.Core = Backbone.View.extend( {

		el : function() {
			return document.querySelector( '#preview-action a' );
		},

		events : {
			'click' : 'onPreviewButtonClick'
		},

		initialize : function() {
			//
		},

		onPreviewButtonClick : function( event ) {
			event.preventDefault();
			event.stopImmediatePropagation();

			this.model.renderNewModal();
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );