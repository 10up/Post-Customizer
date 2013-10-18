( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var $body = $( document.body );

	Scrivener.Views.Modal = Backbone.View.extend( {

		className : 'scrivener-modal',

		initialize : function() {
			this.render();
		},

		render : function() {
			$body.addClass( 'body-absolute' );
			this.$el.appendTo( document.body );
		},

		close : function() {
			this.remove();
			$body.removeClass( 'body-absolute' );
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );