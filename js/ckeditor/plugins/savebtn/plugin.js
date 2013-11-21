( function( window, $, CKEDITOR, undefined ) {

    CKEDITOR.plugins.add( 'savebtn', {
        icons: 'savebtn',
        init: function( editor ) {
            editor.addCommand( 'savecontent', {

            	exec : function(editor){

                    var event = $.Event( 'ckSave' );
                    event.text = editor.getData();
                    event.id = editor.name;
                    event.container = editor.container;

                    $( 'body' ).trigger( event );
            	} 
            });

            editor.ui.addButton( 'savebtn', {
                label: 'Save',
                command: 'savecontent'
            });
        }
    });
} )( window, jQuery, CKEDITOR );