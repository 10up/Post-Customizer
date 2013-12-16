( function( window, Backbone, $, _, Post_Customizer, undefined ) {

	"use strict";
	var document = window.document;

	Post_Customizer.Views.Core = Backbone.View.extend( {

		el : function() {
			return document.querySelector( '#preview-action a' );
		},

		events : {
			'click' : 'onPreviewButtonClick'
		},

		onPreviewButtonClick : function( event ) {
			event.preventDefault();
			event.stopImmediatePropagation();

			this.model.showCustomizer();
		}

	} );

} )( window, Backbone, jQuery, _, Post_Customizer );