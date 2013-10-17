<?php

function carl_add_meta_boxes() {
	add_meta_box( 'js-example', 'JS-Example', 'render_js_example_meta_box', 'screen', 'advanced', 'default' );
}
add_action( 'add_meta_boxes', 'carl_add_meta_boxes' );

function render_js_example_meta_box( $post ) {
	//
}