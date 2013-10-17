( function( Scrivener, window, $ ) {

	"use strict";
	var document = window.document;

	$( document ).ready( function() {

		var coreModel = new Scrivener.Models.Core();
		var coreView = new Scrivener.Views.Core( {
			model : coreModel
		} );

	} );

} )( Scrivener, window, jQuery );