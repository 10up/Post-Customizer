<?php

class Scrivener {

	private static $_instance;

	/**
	 * Setup singleton Scrivener instance.
	 *
	 * @since 0.1.0
	 */
	private function __construct() {
		add_filter( 'preview_post_link', array( $this, 'filter_preview_post_link' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'action_admin_enqueue_scripts' ) );
	}

	/**
	 * Enqueue admin scripts for plugin.
	 * 
	 * @param string $hook The hook name.
	 *
	 * @since 0.1.0
	 */
	public function action_admin_enqueue_scripts( $hook ) {
		if ( 'post.php' != $hook && 'post-new.php' != $hook )
			return;

		//wp_enqueue_script();
	}

	/**
	 * Filter preview post link.
	 *
	 * @param string $link Preview link.
	 *
	 * @since 0.1.0
	 *
	 * @return string The filtered preview link.
	 */
	public function filter_preview_post_link( $link ) {
		global $post;
		return add_query_arg( array( 'action' => 'weiverp', 'p' => $post->ID ), admin_url( 'admin-post.php' ) );
	}

	/**
	 * Initialize class and return an instance of it.
	 *
	 * @since 0.1.0
	 *
	 * @return Scrivener instance.
	 */
	public function init() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new Scrivener;
		}

		return self::$_instance;
	}

} // Scrivener

Scrivener::init();
