( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = {
		modal : null,
		framePreview : null,
		sidebar : null
	};

	Scrivener.Models.Core = Backbone.Model.extend( {

		initialize : function( attributes ) {
			this.set( 'localizedData', attributes.localizedData );
		},

		buildPreviewURL : function() {
			var post_id = document.getElementById( 'post_ID' ).value;
			var data = this.get( 'localizedData' );
			return data.admin_url + 'admin-post.php?action=weivrep&p=' + post_id;
		},

		renderNewModal : function() {
			if( currentModalView.modal !== null ) {
				currentModalView..modal.close();
			}
			if( currentModalView.framePreview !== null ) {
				currentModalView.framePreview.close();
			}
			if( currentModalView.sidebar !== null ) {
				currentModalView.sidebar.close();
			}

			var modal = new Scrivener.Views.Modal( {
				model : this
			} );
			var framePreview = new Scrivener.Views.FramePreview( {
				model : this
			} );
			var sidebar = new Scrivener.Views.Sidebar( {
				model : this
			} );

			currentModalView = {
				modal : modal,
				framePreview : framePreview,
				sidebar : sidebar
			};
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
