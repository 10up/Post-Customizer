( function( window, Backbone, $, _, Post_Customizer, undefined ) {

	"use strict";
	var document = window.document;

	Post_Customizer.Views.FramePreview = Backbone.View.extend( {

		ID : 'customize-preview',
		className : 'post-customizer-frame-preview wp-full-overlay-main',

		initialize : function() {
			this.render();
		},

		render : function() {
			var $previewFrame = $( '<iframe src="' + this.model.buildPreviewURL() + '"></iframe>' );
			this.$el.html( $previewFrame );
			this.model.set( { '$previewFrame' : $previewFrame } );
		},

		close : function() {
			this.remove();
		}

	} );

} )( window, Backbone, jQuery, _, Post_Customizer );