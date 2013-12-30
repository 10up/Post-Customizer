( function( window, $, ajaxURL, Post_Customizer, wp, undefined ) {

	var document = window.document;
	var cache = {};
	var excerptDeferred = null;
	var lastExcerpt = '';

	function init() {
		cacheUI();
		createOverlay();

		// Override wp.autosave.getPostData method
		wp.autosave.getPostData = getPostData;

		registerAutosaveInterval();
		registerListener();

		CKEDITOR.on( 'instanceReady', preventLinkedEditor );
	};

	function preventLinkedEditor() {
		$( '.cke_editable' ).parents( 'a' ).attr( 'href', 'javascript:void(0);' );
	}

	function registerListener() {
		$( window ).on( 'message', function( event ) {
			var message = event.originalEvent.data;

			if ( message.type == 'excerpt' ) {
				lastExcerpt = message.excerpt || '';
				excerptDeferred.resolve();
			} else if ( message.type == 'save' ) {
				lastExcerpt = message.excerpt || '';
				
				$.ajax( {
					url : 'post.php?post=' + Post_Customizer_Data.post_id,
					type : 'post',
					data : {
						action : 'editpost',
						excerpt : lastExcerpt,
						post_ID : Post_Customizer_Data.post_id,
						content : $( '.post-customizer-content' ).html(),
						post_title : $( '.post-customizer-title' ).html(),
						_wpnonce : Post_Customizer_Data.saveNonce,
						_wp_http_referer : '/wp-admin/post.php?post=' + Post_Customizer_Data.post_id,
					},
					success : function() {
						// post message back signaling finished save
						var message = {
							type : 'saveComplete',
							newTitle : $( '.post-customizer-title' ).html(),
							newContent : $( '.post-customizer-content' ).html(),
						};

						window.parent.postMessage( message, '*' );
					},
				} );
			}
		} );
	};

	function triggerAutosave() {
		if ( ! excerptDeferred || excerptDeferred.state() == 'resolved' ) {

			var message = {
				'type' : 'requestExcerpt',
			}

			excerptDeferred = $.Deferred();

			window.parent.postMessage( message, '*' );

			$.when( excerptDeferred ).then( function() {
				autosave();
			} );
		}
	};

	function registerAutosaveInterval() {
		// Autosave every two minutes
		cache.autosaveInterval = setInterval( triggerAutosave, (1000 * 10) );
	};

	function getPostData() {
		var data = {
			action : 'autosave',
			autosave : true,
			autosavenonce : Post_Customizer_Data.autosaveNonce,
			post_id : Post_Customizer_Data.post_id,
			excerpt : lastExcerpt,
		};

		data.post_title = $( '.post-customizer-title' ).html() || '';
		data.content = $( '.post-customizer-content' ).html() || '';

		return data;
	};

	function cacheUI() {
		cache.$body = $( document.body );
	}

	function createOverlay() {
		var overlay = document.createElement( 'div' );
		overlay.className = 'post-customizer-frame-preview-overlay';
		document.body.appendChild( overlay );
		cache.$overlay = $( overlay );
	}

	$( document ).ready( init );

} )( window, jQuery, parent.ajaxurl, parent.Post_Customizer, wp );