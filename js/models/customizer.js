( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = {
		modal : null,
		framePreview : null,
		sidebar : null
	};
	var XHR = null;

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
			if( XHR !== null ) {
				XHR.abort();
			}
			var data = this.get( 'localizedData' );

			XHR = $.ajax( {
				url : data.ajaxURL,
				type : 'POST',
				dataType : 'JSON',
				data : {
					action : 'scrivener',
					_ajax_nonce : data.ajaxNonce
				},
				success : $.proxy( this.renderCustomizer, this )
			} );
		},

		renderCustomizer : function( ajaxData ) {
			this.closeCustomizer();

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
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
