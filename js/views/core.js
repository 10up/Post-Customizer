( function( window, Backbone, $, _, Post_Customizer, undefined ) {

	"use strict";
	var document = window.document;

	Post_Customizer.Views.Core = Backbone.View.extend( {

		el : '#preview-action a',

		events : {
			'click' : 'onPreviewButtonClick'
		},

		initialize : function() {
			$( '.wp-list-table' ).on( 'click', '.status-draft .view a', _.bind( this.onPreviewButtonClick, this ) );
		},

		onPreviewButtonClick : function( event ) {
			event.preventDefault();
			event.stopImmediatePropagation();

			var localizedData = this.model.get( 'localizedData');

			if ( parseInt( localizedData.is_list_table ) ) {
				var $target = $( event.currentTarget );
				var post_id = $target.parents( 'tr.status-draft' ).find( 'input[name="post[]"]' ).val();
			} else {
				var post_id = document.getElementById( 'post_ID' ).value;
			}

			this.model.showCustomizer( post_id );
		}

	} );

} )( window, Backbone, jQuery, _, Post_Customizer );