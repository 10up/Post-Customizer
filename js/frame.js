( function( window, $, ajaxURL, Scrivener, wp, undefined ) {

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
	};

	function registerListener() {
		$( window ).on( 'message', function( event ) {
			var message = event.originalEvent.data;

			if ( message.type == 'excerpt' ) {
				lastExcerpt = message.excerpt || '';
				excerptDeferred.resolve();
			} else if ( message.type == 'save' ) {
				lastExcerpt = message.excerpt || '';
				
				$.ajax( {
					url : 'post.php?post=' + Scrivener_Data.post_id,
					type : 'post',
					data : {
						action : 'editpost',
						excerpt : lastExcerpt,
						post_ID : Scrivener_Data.post_id,
						content : $( '.scrivener-content' ).html(),
						post_title : $( '.scrivener-title' ).html(),
						_wpnonce : Scrivener_Data.saveNonce,
						_wp_http_referer : '/wp-admin/post.php?post=' + Scrivener_Data.post_id,
					},
					success : function() {
						// post message back signaling finished save
						var message = {
							type : 'saveComplete',
							newTitle : $( '.scrivener-title' ).html(),
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
			autosavenonce : Scrivener_Data.autosaveNonce,
			post_id : Scrivener_Data.post_id,
			excerpt : lastExcerpt,
		};

		data.post_title = $( '.scrivener-title' ).html() || '';
		data.content = $( '.scrivener-content' ).html() || '';

		return data;
	};

	function cacheUI() {
		cache.$body = $( document.body );
	}

	function createOverlay() {
		var overlay = document.createElement( 'div' );
		overlay.className = 'scrivener-frame-preview-overlay';
		document.body.appendChild( overlay );
		cache.$overlay = $( overlay );
	}

	$( document ).ready( init );

} )( window, jQuery, parent.ajaxurl, parent.Scrivener, wp );