( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = null;

	Scrivener.Models.Core = Backbone.Model.extend( {

		buildPreviewURL : function() {
			var post_id = document.getElementById( 'post_ID' ).value;
			return scrivener_data.admin_url + 'admin-post.php?action=weivrep&p=' + post_id;
		},

		renderNewModal : function() {
			if( currentModalView !== null ) {
				currentModalView.close();
			}

			currentModalView = new Scrivener.Views.Modal( {
				model : this
			} );
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
