( function( Post_Customizer, window, $, Post_Customizer_Data ) {

	"use strict";
	var document = window.document;

	$( document ).ready( function() {

		Post_Customizer.Instance.coreModel = new Post_Customizer.Models.Core( {
			localizedData : Post_Customizer_Data
		} );
		Post_Customizer.Instance.coreView = new Post_Customizer.Views.Core( {
			model : Post_Customizer.Instance.coreModel
		} );

	} );

} )( Post_Customizer, window, jQuery, Post_Customizer_Data );