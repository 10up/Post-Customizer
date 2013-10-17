( function( window, Backbone, $, _, Scrivener, Scrivener_Data, undefined ) {

	"use strict";
	var document = window.document;

	Scrivener.Models.Core = Backbone.Model.extend( {

		buildPreviewURL : function() {
			var post_id = document.getElementById( 'post_ID' ).value;
			return Scrivener_Data.admin_url + 'admin-post.php?action=weivrep&p=' + post_id;
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener, Scrivener_Data );
