( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.Modal = Backbone.View.extend( {

		className : 'scrivener-modal',

		initialize : function() {
			this.render();
		},

		render : function() {
			this.$el.appendTo( document.body );
		},

		close : function() {
			this.$el.remove();
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );