( function( window, $, undefined ) {

	var document = window.document;
	var cache = {};

	function init() {
		createOverlay();
	}

	function createOverlay() {
		var overlay = document.createElement( 'div' );
		overlay.className = 'scrivener-frame-preview-overlay';
		document.body.appendChild( overlay );
		cache.$overlay = $( overlay );
	}
	$( document ).ready( init );

} )( window, jQuery );