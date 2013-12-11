( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.FramePreview = Backbone.View.extend( {

		ID : 'customize-preview',
		className : 'scrivener-customizer-frame-preview wp-full-overlay-main',

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

} )( window, Backbone, jQuery, _, Scrivener );