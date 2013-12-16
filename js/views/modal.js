( function( window, Backbone, $, _, Post_Customizer, undefined ) {

	"use strict";
	var document = window.document;
	var $body = $( document.body );

	Post_Customizer.Views.Modal = Backbone.View.extend( {

		className : 'post-customizer-modal wp-full-overlay expanded',

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

} )( window, Backbone, jQuery, _, Post_Customizer );