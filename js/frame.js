( function( window, $, CKEDITOR, undefined ) {

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

		CKEDITOR.on( 'instanceCreated', function( event ) {
			event.editor.on( 'change', function( changeEvent ) {
			
				var editor = changeEvent.editor;

				var container = editor.document.$.activeElement;
				
				// We will save to this field in WP
				var saveTo = container.getAttribute( 'data-wp-field' );

				// Next get content of editor

				/**
				send content back to WP using AJAX
				if ( lastAjaxCall != null ) lastAjaxCall.abort()
				lastAjaxCall = $.ajax( ... )

				we either do this or have a save button in the editor
				**/

			} );
		} );

	}

	$( document ).ready( init );

} )( window, jQuery, CKEDITOR );