( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var customizerModel = null;

	Scrivener.Models.Core = Backbone.Model.extend( {

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

		showCustomizer : function() {
			if( customizerModel !== null ) {
				customizerModel.closeCustomizer();
			}

			customizerModel = new Scrivener.Models.Customizer( {
				localizedData : this.get( 'localizedData' )
			} );
			customizerModel.openCustomizer();
		}

	} );

} )( window, Backbone, jQuery, _, Scrivener );
