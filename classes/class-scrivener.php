<?php

class Scrivener {

	private static $_instance;

	/**
	 * Setup singleton Scrivener instance
	 *
	 * @since 0.1.0
	 * @uses add_filter
	 * @return void
	 */
	private function __construct() {
		add_filter( 'preview_post_link', array( $this, 'filter_preview_post_link' ) );
		add_filter( 'admin_post_weiverp', array( $this, 'is_this_real_life' ) );
	}

	/**
	 * Filter preview post link
	 *
	 * @param string $link
	 * @since 0.1.0
	 * @uses admin_url
	 * @return string
	 */
	public function filter_preview_post_link( $link ) {
		global $post;
		return admin_url( 'admin-post.php?action=weiverp&p=' . $post->ID );
	}

	/**
	 * Admin post handler to display the preview
	 *
	 * Is this real life?
	 */
	public function is_this_real_life() {
		define( 'WP_USE_THEMES', true );
		define( 'IFRAME_REQUEST', true );
		wp();
		require ABSPATH . WPINC . '/template-loader.php';
	}

	/**
	 * Initialize class and return an instance of it
	 *
	 * @since 0.1.0
	 * @return Scrivener
	 */
	public function init() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new Scrivener;
		}

		return self::$_instance;
	}

}

Scrivener::init();