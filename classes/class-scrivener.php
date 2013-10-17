<?php

class Scrivener {

	private static $_instance;

	private function __construct() {
		add_filter( 'preview_post_link', array( $this, 'filter_preview_post_link' ) );
	}

	public function filter_preview_post_link() {

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