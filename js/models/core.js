( function( window, Backbone, $, _, Post_Customizer, undefined ) {

	"use strict";
	var document = window.document;
	var customizerModel = null;

	Post_Customizer.Models.Core = Backbone.Model.extend( {

		initialize : function( attributes ) {
			this.set( 'localizedData', attributes.localizedData );
		},

		showCustomizer : function( post_id ) {
			if( customizerModel !== null ) {
				customizerModel.closeCustomizer();
			}

			customizerModel = new Post_Customizer.Models.Customizer( {
				localizedData : this.get( 'localizedData' ),
				postID : post_id,
			} );
			customizerModel.openCustomizer();
		},

		getCustomizerModelObject : function() {
			if( customizerModel === null ) {
				return false;
			}
			return customizerModel;
		}

	} );

} )( window, Backbone, jQuery, _, Post_Customizer );
