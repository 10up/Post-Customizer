( function( Scrivener, window, $, Scrivener_Data ) {

	"use strict";
	var document = window.document;

	$( document ).ready( function() {

		Scrivener.Instance.coreModel = new Scrivener.Models.Core( {
			localizedData : Scrivener_Data
		} );
		Scrivener.Instance.coreView = new Scrivener.Views.Core( {
			model : Scrivener.Instance.coreModel
		} );

	} );

} )( Scrivener, window, jQuery, Scrivener_Data );