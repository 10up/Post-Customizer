( function( window, Backbone, $, _, Scrivener, undefined ) {

	"use strict";
	var document = window.document;
	var customizerModel = null;

	Scrivener.Models.Core = Backbone.Model.extend( {

		initialize : function( attributes ) {
			this.set( 'localizedData', attributes.localizedData );
		},

		showCustomizer : function( data ) {
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
