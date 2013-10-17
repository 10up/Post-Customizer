( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var currentModalView = null;

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
			if( currentModalView !== null ) {
				currentModalView.close();
			}

			currentModalView = new Scrivener.Views.Modal( {
				model : this
			} );
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
