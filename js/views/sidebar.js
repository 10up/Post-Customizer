( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.Sidebar = Backbone.View.extend( {

		className : 'scrivener-customizer-sidebar',

		initialize : function() {
			this.render();
		},

		render : function() {
			this.$el.html( '<div class="content">sidebar</div>' );
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );