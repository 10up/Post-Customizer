<?php

class Scrivener {

	private static $_instance;

	/**
	 * Setup singleton Scrivener instance
	 *
	 * @since 0.1.0
	 * @uses add_filter, add_action
	 * @return void
	 */
	private function __construct() {
		add_filter( 'preview_post_link', array( $this, 'filter_preview_post_link' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'action_admin_enqueue_scripts' ) );
	}

	/**
	 * Enqueue admin scripts for plugin
	 * 
	 * @param string $hook
	 * @since 0.1.0
	 * @uses wp_enqueue_script
	 * @return void
	 */
	public function action_admin_enqueue_scripts( $hook ) {
		if ( 'post.php' != $hook && 'post-new.php' != $hook )
			return;

		//wp_enqueue_script();
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
	 * Initialize class and return an instance of it
	 *
	 * @since 0.1.0
	 * @return Scrivener
	 */
	public static function init() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new Scrivener;
		}

		return self::$_instance;
	}

}

Scrivener::init();