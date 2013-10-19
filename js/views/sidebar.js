( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.Sidebar = Backbone.View.extend( {

		className : 'scrivener-customizer-sidebar wp-full-overlay-sidebar-content accordion-container',

		events : {
			'click .button.close' : 'onCloseCustomizerClick',
		},

		initialize : function( attributes ) {
			this.render( attributes.ajaxData );
		},

		render : function( ajaxData ) {
			this.$el.html( '<div class="content">' + ajaxData.sidebarHTML + '</div>' );
		},

		onCloseCustomizerClick : function( event ) {
			this.model.closeCustomizer();
		},

		close : function() {
			this.remove();
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );