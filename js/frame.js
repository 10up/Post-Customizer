( function( window, $, undefined ) {

	var document = window.document;
	var cache = {};
	var lastAjaxCall = null

	function init() {
		createOverlay();
		registerCKEditorHandlers();
	}

	function createOverlay() {
		var overlay = document.createElement( 'div' );
		overlay.className = 'scrivener-frame-preview-overlay';
		document.body.appendChild( overlay );
		cache.$overlay = $( overlay );
	}

	function registerCKEditorHandlers() {

		$( 'body' ).on( 'ckSave', function( event ) {
			$.ajax( {
				url : ajaxurl,
				type : 'post',
				data : {
					action : 'scrivener_save_field',
					data : event.text,
					field : event.container.$.getAttribute( 'data-wp-field' ),
				}
			} );
		} );

	}

	$( document ).ready( init );

} )( window, jQuery );