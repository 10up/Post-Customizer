( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = {
		modal : null,
		framePreview : null,
		sidebar : null
	};

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
			return data.admin_url + 'admin-post.php?action=weivrep&p=' + post_id;
		},

		/**
		 * Removes the old modal and creates a new one
		 */
		openCustomizer : function() {
			this.closeCustomizer();

			var modal = new Scrivener.Views.Modal( {
				model : this
			} );
			var framePreview = new Scrivener.Views.FramePreview( {
				model : this
			} );
			var sidebar = new Scrivener.Views.Sidebar( {
				model : this
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
			}
			if( currentModalView.framePreview !== null ) {
				currentModalView.framePreview.close();
			}
			if( currentModalView.sidebar !== null ) {
				currentModalView.sidebar.close();
			}
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
