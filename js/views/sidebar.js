( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;

	var $post_thumbnail_meta_position;
	var $post_thumbnail_meta = null;
	var $post_thumbnail_sidebar_container = null;
	var $post_thumbnail_meta_position_parent = null;
	var $accordion_section_content = $( '.accordion-section-content' );
	var $excerpt_input = null;
	var $overlay = null;
	var $spinner = null;
	var $post_title = null;
	var save_deferred = null;

	Scrivener.Views.Sidebar = Backbone.View.extend( {

		className : 'scrivener-customizer-sidebar wp-full-overlay-sidebar-content',

		events : {
			'click .button.close' : 'onCloseCustomizerClick',
			'click .button.save' : 'onUpdateClick',
			'click .accordion-section-title' : 'toggleAccordionSection',
			'click .collapse-sidebar' : 'toggleSidebar'
		},

		initialize : function( attributes ) {
			this.render( attributes.ajaxData );

			$overlay = $( '.wp-full-overlay' );

			$( window ).on( 'message', _.bind( this.messageListener, this ) );
		},

		toggleSidebar : function() {
			$overlay.toggleClass( 'collapsed' ).toggleClass( 'expanded' );
		},

		onUpdateClick : function( event ) {
			if ( ! save_deferred || save_deferred.state() == 'resolved' ) {

				// add spinner

				var message = {
					'excerpt' : ( $excerpt_input ) ? $excerpt_input.val() : '',
					'type' : 'save',
				};

				var $previewFrame = this.model.get( '$previewFrame' );

				$spinner.fadeIn();

				save_deferred = $.Deferred();

				$previewFrame[0].contentWindow.postMessage( message, '*' );

				$.when( save_deferred ).then( function() {
					$spinner.fadeOut();
				} );
			}
		},

		messageListener : function( event ) {
			var message = event.originalEvent.data;

			if ( message.type == 'requestExcerpt' ) {
				this.sendExcerpt();
			} else if ( message.type == 'saveComplete' ) {
				console.log(message);
				console.log($post_title);
				$post_title.html( message.newTitle );
				save_deferred.resolve();
			}
		},

		sendExcerpt : function() {
			var message = {
				'excerpt' : ( $excerpt_input ) ? $excerpt_input.val() : '',
				'type' : 'excerpt',
			};

			var $previewFrame = this.model.get( '$previewFrame' );
			$previewFrame[0].contentWindow.postMessage( message, '*' );
		},

		toggleAccordionSection : function( event ) {
			var $section = $( event.currentTarget ).closest( '.accordion-section' );
			var $siblings = $section.closest( '.accordion-container' ).find( '.open' );
			var $content = $section.find( $accordion_section_content );

			if ( $section.hasClass( 'open' ) ) {
				$section.toggleClass( 'open' );
				$content.toggle( true ).slideToggle( 150 );
			} else {
				$siblings.removeClass( 'open' );
				$siblings.find( $accordion_section_content ).show().slideUp( 150 );
				$content.toggle( false ).slideToggle( 150 );
				$section.toggleClass( 'open' );
			}
		},

		render : function( ajaxData ) {
			this.$el.html( '<div class="content">' + ajaxData.sidebarHTML + '</div>' );

			$excerpt_input = this.$el.find( '#post_excerpt' );
			
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

			$spinner = this.$el.find( '.update-spinner' );
			$post_title = this.$el.find( '#customize-title .post-title' );
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
		},

		changePostTitle : function( newTitle ) {
			this.$el.find( '.theme-name' ).html( newTitle );
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );