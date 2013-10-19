( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	var $post_thumbnail_meta_position;
	var $post_thumbnail_meta = null;
	var $post_thumbnail_sidebar_container = null;
	var $post_thumbnail_meta_position_parent = null;

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
			
			if ( $post_thumbnail_meta == null ) {
				$post_thumbnail_meta = $( '#postimagediv' );
			}

			$post_thumbnail_meta_position = $post_thumbnail_meta.prev();
			if ( ! $post_thumbnail_meta_position.length ) {
				$post_thumbnail_meta_position_parent = $post_thumbnail_meta.parent();
			}

			if ( $post_thumbnail_sidebar_container == null ) {
				$post_thumbnail_sidebar_container = this.$el.find( '.post-thumbnail-container' )
			}

			$post_thumbnail_meta.appendTo( $post_thumbnail_sidebar_container );
		},

		onCloseCustomizerClick : function( event ) {
			this.model.closeCustomizer();
		},

		close : function() {
			this.remove();
			if ( $post_thumbnail_meta_position_parent ) {
				$post_thumbnail_meta_position_parent.prepend( $post_thumbnail_meta );
				$post_thumbnail_meta_position_parent = null;
			} else {
				$post_thumbnail_meta_position.after( $post_thumbnail_meta );
				$post_thumbnail_meta_position = null;
			}
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );