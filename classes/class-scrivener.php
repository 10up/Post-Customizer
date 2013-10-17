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
		return admin_url( 'admin-post.php?weiverp=1&p=' . $post->ID );
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