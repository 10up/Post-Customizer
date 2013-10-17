<?php

class Scrivener {

	private static $_instance;

	/**
	 * Setup singleton Scrivener instance.
	 *
	 * @since 0.1.0
	 */
	private function __construct() {
		add_filter( 'preview_post_link',     array( $this, 'filter_preview_post_link' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'action_admin_enqueue_scripts' ) );
		add_action( 'init',                  array( $this, 'trick_wp' ), 9 );
		add_filter( 'admin_post_weiverp',    array( $this, 'is_this_real_life' ) );
	}

	public function get_editable_fields() {
		$fields = array(
			'post_title' => array(
				'label' => 'Post Title',
				'type' => 'text',
			),
			'post_excerpt' => array(
				'label' => 'Post Title',
				'type' => 'text',
			),
		);

		return apply_filters( 'scrivener_editable_fields', $fields );
	}

	/**
	 * Enqueue admin scripts for plugin.
	 *
	 * @since 0.1.0
	 *
	 * @param string $hook The hook name.
	 */
	public function action_admin_enqueue_scripts( $hook ) {
		if ( 'post.php' != $hook && 'post-new.php' != $hook )
			return;

		$base = plugins_url( '', dirname( __FILE__ ) );

		// include the base component
		wp_enqueue_script( 'scrivener', $base . '/js/app.js', array( 'backbone' ), '0.1', true );

		$scrivener_data = array(
			'sections' => $this->get_editable_fields(),
			'admin_url' => admin_url(),
		);

		wp_localize_script( 'scrivener', 'Scrivener_Data', $scrivener_data );

		// include our dependencies
		wp_enqueue_script( 'scrivener-models-core', $base . '/js/models/core.js', array( 'scrivener' ) );
		wp_enqueue_script( 'scrivener-views-core', $base . '/js/views/core.js', array( 'scrivener' ) );
		wp_enqueue_script( 'scrivener-views-modal', $base . '/js/views/modal.js', array( 'scrivener' ) );

		// include bootstrap
		wp_enqueue_script( 'scrivener-bootstrap', $base . '/js/main.js', array( 'scrivener' ) );
	}

	/**
	 * Filter preview post link.
	 *
	 * @since 0.1.0
	 *
	 * @param string $link Preview link.
	 * @return string The filtered preview link.
	 */
	public function filter_preview_post_link( $link = '' ) {
		$link = add_query_arg( array( 'action' => 'weiverp', 'p' => get_the_ID() ), admin_url( 'admin-post.php' ) );
		return $link;
	}

	/**
	 * Trick WP into thinking this is a preview
	 *
	 * LOL
	 */
	public function trick_wp() {
		if ( is_admin() && ! empty( $_GET['action'] ) && $_GET['action'] === 'weiverp' ) {
			$_GET['preview']       = 'true';
			$_GET['preview_id']    = $_GET['p'];
			$_GET['preview_nonce'] = wp_create_nonce( 'post_preview_' . $_GET['p'] );
		}
	}

	/**
	 * Admin post handler to display the preview
	 *
	 * Is this real life?
	 *
	 * @since 0.1.0
	 */
	public function is_this_real_life() {
		define( 'WP_USE_THEMES', true );
		define( 'IFRAME_REQUEST', true );
		wp();
		remove_action( 'wp_head', '_admin_bar_bump_cb' );

		// Wrap the title and content in Scrivener ID's
		add_filter( 'the_title',   array( $this, 'filter_the_title'   ) );
		add_filter( 'the_content', array( $this, 'filter_the_content' ) );

		// Pul in the template-loader to output theme-side post-preview
		require( ABSPATH . WPINC . '/template-loader.php' );

		// Remove filters (maybe not necessary)
		remove_filter( 'the_title',   array( $this, 'filter_the_title'   ) );
		remove_filter( 'the_content', array( $this, 'filter_the_content' ) );
	}

	/**
	 * Wrap the_title in a Scrivener div
	 *
	 * @since 0.1.0
	 *
	 * @param string $title
	 * @return string $title wrapped in a div
	 */
	public static function filter_the_title( $title = '' ) {
		return '<div id="scrivener-title">' . $title . '</div>';
	}

	/**
	 * Wrap the_content in a Scrivener div
	 *
	 * @since 0.1.0
	 *
	 * @param string $content
	 * @return string $content wrapped in a div
	 */
	public static function filter_the_content( $content = '' ) {
		return '<div id="scrivener-content">' . $content . '</div>';
	}

	/**
	 * Initialize class and return an instance of it.
	 *
	 * @since 0.1.0
	 *
	 * @return Scrivener instance.
	 */
	public static function init() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new Scrivener;
		}

		return self::$_instance;
	}

} // Scrivener

Scrivener::init();
