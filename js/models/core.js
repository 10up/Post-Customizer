( function( window, Backbone, $, _, Scrivener, Scrivener_Data, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = null;

	Scrivener.Models.Core = Backbone.Model.extend( {

		buildPreviewURL : function() {
			var post_id = document.getElementById( 'post_ID' ).value;
<<<<<<< HEAD
			return Scrivener_Data.admin_url + 'admin-post.php?action=weivrep&p=' + post_id;
=======
			return scrivener_data.admin_url + 'admin-post.php?action=weivrep&p=' + post_id;
		},

		renderNewModal : function() {
			if( currentModalView !== null ) {
				currentModalView.close();
			}

			currentModalView = new Scrivener.Views.Modal( {
				model : this
			} );
>>>>>>> ff1dd73ac1082303443351b1493f8927477b9c5e
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener, Scrivener_Data );
