( function( Scrivener, window, $, Scrivener_Data ) {

	"use strict";
	var document = window.document;

	$( document ).ready( function() {

		var coreModel = new Scrivener.Models.Core( {
			localizedData : Scrivener_Data
		} );
		var coreView = new Scrivener.Views.Core( {
			model : coreModel
		} );

	} );

} )( Scrivener, window, jQuery, Scrivener_Data );