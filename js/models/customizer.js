( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = {
		modal : null,
		framePreview : null,
		sidebar : null
	};
	var XHR = null;
	var styleSheetObject = null;

	Scrivener.Models.Customizer = Backbone.Model.extend( {

		initialize : function( attributes ) {
			this.set( 'localizedData', attributes.localizedData );
		},

		/**
		 * Builds the preview URL for our frame preview
		 *
		 * @returns {string}
		 */
		buildPreviewURL : function() {
			var post_id = document.getElementById( 'post_ID' ).value;
			var data = this.get( 'localizedData' );
			return data.admin_url + 'admin-post.php?action=weiverp&p=' + post_id;
		},

		/**
		 * Removes the old modal and creates a new one
		 */
		openCustomizer : function() {
			this.closeCustomizer();
			if( XHR !== null ) {
				XHR.abort();
			}
			var data = this.get( 'localizedData' );
			this.addStyles( data.style_url );

			XHR = $.ajax( {
				url : data.ajaxURL,
				type : 'POST',
				dataType : 'JSON',
				data : {
					post_id: data.post_id,
					action : 'scrivener',
					scrivener_action: 'get_sidebar',
					_ajax_nonce : data.ajaxNonce
				},
				success : $.proxy( this.renderCustomizer, this )
			} );
		},

		addStyles : function( url ) {
			var link = document.createElement( 'link' );
			link.setAttribute( 'href', url );
			link.setAttribute( 'rel', 'stylesheet' );
			link.setAttribute( 'type', 'text/css' );

			var head = document.getElementsByTagName( 'head' )[ 0 ];
			head.appendChild( link );

			styleSheetObject = link;
		},

		removeStyles : function() {
			if( styleSheetObject !== null ) {
				styleSheetObject.parentNode.removeChild( styleSheetObject );
				styleSheetObject = null;
			}
		},

		renderCustomizer : function( ajaxData ) {
			var modal = new Scrivener.Views.Modal( {
				model : this,
				ajaxData : ajaxData
			} );
			var framePreview = new Scrivener.Views.FramePreview( {
				model : this,
				ajaxData : ajaxData
			} );
			var sidebar = new Scrivener.Views.Sidebar( {
				model : this,
				ajaxData : ajaxData
			} );

			modal.$el.append( framePreview.$el );
			modal.$el.append( sidebar.$el );

			currentModalView = {
				modal : modal,
				framePreview : framePreview,
				sidebar : sidebar
			};
		},

		/**
		 * Removes the existing modal if it exists
		 */
		closeCustomizer : function() {
			this.removeStyles();
			if( currentModalView.modal !== null ) {
				currentModalView.modal.close();
				currentModalView.modal = null;
			}
			if( currentModalView.framePreview !== null ) {
				currentModalView.framePreview.close();
				currentModalView.framePreview = null;
			}
			if( currentModalView.sidebar !== null ) {
				currentModalView.sidebar.close();
				currentModalView.sidebar = null;
			}
		},

		autosavePost : function( html ) {
			this.setEditorContent( html );
			autosave();
		},

		getEditorContent : function() {
			var tinymceContent = tinymce.get( 'content' );

			if( tinymceContent !== undefined ) {
				return tinymceContent.getContent();
			} else {
				return document.getElementById( 'content').value;
			}
		},

		setEditorContent : function( html ) {
			var tinymceContent = tinymce.get( 'content' );

			if( tinymceContent !== undefined ) {
				tinymceContent.setContent( html, { format : 'raw' } );
			} else {
				document.getElementById( 'content').value = html;
			}
		},

		changePostTitle : function( newTitle ) {
			currentModalView.sidebar.changePostTitle( newTitle );
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
