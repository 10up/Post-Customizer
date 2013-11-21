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
					action : 'scrivener',
					scrivener_action : 'save_field',
					post_id : Scrivener_Data.post_id,
					_ajax_nonce : Scrivener_Data.ajaxNonce,
					data : event.text,
					field : event.container.$.getAttribute( 'data-wp-field' ),
				}
			} );
		} );

	}

	$( document ).ready( init );

} )( window, jQuery );