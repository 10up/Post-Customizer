( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Views.Sidebar = Backbone.View.extend( {

		className : 'scrivener-customizer-sidebar',

		events : {
			'click .button.close' : 'onCloseCustomizerClick',
			'click #set-post-thumbnail' : 'openMediaManager',
			'click #remove-post-thumbnail' : 'removePostThumbnail',
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
		},

		openMediaManager: function( event ) {
			event.stopPropagation();
			event.preventDefault();
			wp.media.featuredImage.frame().open();
		},

		removePostThumbnail: function( event ) {
			//wp.media.view.settings.post.featuredImageId = -1;
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );