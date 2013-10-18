( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.FramePreview = Backbone.View.extend( {

		className : 'scrivener-customizer-frame-preview',

		initialize : function() {
			this.render();
		},

		render : function() {
			var html = '<iframe src="' + this.model.buildPreviewURL() + '"></iframe>';
			this.$el.html( html );
		},

		close : function() {
			this.remove();
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );