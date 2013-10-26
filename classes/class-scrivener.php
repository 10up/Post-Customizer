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
		add_action( 'wp_ajax_scrivener',     array( $this, 'process_ajax_request' ) );
	}

	public function process_ajax_request() {
		check_ajax_referer( 'scrivener' );

		if ( empty( $_POST['scrivener_action'] ) )
			return;

		if ( 'get_sidebar' == $_POST['scrivener_action'] ) {

			if ( empty( $_POST['post_id'] ) )
				return;

			$data = array(
				'sidebarHTML' => $this->_render_sidebar_data( $_POST['post_id'] ),
			);
		} elseif ( 'save_post' == $_GET['scrivener_action'] ) {

		} else {
			//Error!
		}

		wp_send_json( $data );
	}

	/**
	 * Render the sidebar for a given post.
	 *
	 * @since 0.1.0
	 *
	 * @param int $post_id
	 * @return string
	 */
	protected function _render_sidebar_data( $post_id ) {

		// Look for the post
		$_post = get_post( $post_id );

		// Bail if no post
		if ( empty( $_post ) )
			return;

		// Purposely overwrite the $post global. Barf, but... necessary.
		global $post;
		$post = $_post;

		// Setup the global post data
		setup_postdata( $_post );

		// Start the output buffer for the sidebar
		ob_start(); ?>

		<form id="customize-controls" class="wrap wp-full-overlay-sidebar">
			<div id="customize-header-actions" class="wp-full-overlay-header">
				<a href="javascript:void(0);" class="button button-primary save"><?php _e( 'Update', 'scrivener' ); ?></a>
				<a href="javascript:void(0);" class="back button close"><?php _e( 'Close', 'scrivener' ); ?></a>
			</div>

			<div class="wp-full-overlay-sidebar-content accordion-container" tabindex="-1">

				<div id="customize-info" class="accordion-section">
					<div class="accordion-section-title" aria-label="<?php _e( 'Post Preview', 'scrivener' );?>" tabindex="0">
						<span class="preview-notice">
							<?php _e( 'You are previewing', 'scrivener' );?>
							<strong class="theme-name"><?php the_title(); ?></strong>
						</span>
					</div>
				</div>

				<div id="customize-theme-controls">
					<ul>
						<li id="accordion-section-title_tagline" class="control-section accordion-section top">
							<h3 class="accordion-section-title" tabindex="0"><?php _e( 'Excerpt', 'scrivener' ); ?></h3>
							<ul class="accordion-section-content">
								<li id="customize-control-excerpt" class="customize-control customize-control-textarea">
									<label>
										<span class="customize-control-excerpt"><?php _e( 'Excerpt:', 'scrivener' ); ?></span>
										<textarea name="post_excerpt" id="post_excerpt"><?php echo get_the_excerpt(); ?></textarea>
									</label>
								</li>
							</ul>
						</li>
						<li id="accordion-section-colors" class="control-section accordion-section">
							<h3 class="accordion-section-title" tabindex="0"><?php _e( 'Post Thumbnail', 'scrivener' ); ?></h3>
							<ul class="accordion-section-content">
								<li id="customize-control-thumbnail" class="customize-control customize-control-thumbnail">
									<div class="post-thumbnail-container"></div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>

			<div id="customize-footer-actions" class="wp-full-overlay-footer">
				<a href="#" class="collapse-sidebar button-secondary" title="<?php _e( 'Collapse Sidebar', 'scrivener' ); ?>">
					<span class="collapse-sidebar-arrow"></span>
					<span class="collapse-sidebar-label"><?php _e( 'Collapse', 'scrivener' ); ?></span>
				</a>
			</div>
		</form>

		<?php

		$html = ob_get_clean();

		return str_replace( array( "\n", "\t", "\r" ), '', $html );
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

		// Customizer controls
		wp_enqueue_script( 'customize-controls' );

		// include the base component
		wp_enqueue_script( 'scrivener', $base . '/js/app.js', array( 'backbone' ), '0.1', true );

		$scrivener_data = array(
			'style_url' => admin_url( 'css/customize-controls.css' ),
			'post_id' => get_the_ID(),
			'admin_url' => admin_url(),
			'ajaxURL' => admin_url( 'admin-ajax.php' ),
			'ajaxNonce' => wp_create_nonce( 'scrivener' ),
		);
		wp_localize_script( 'scrivener', 'Scrivener_Data', $scrivener_data );

		// include our dependencies
		wp_enqueue_script( 'scrivener-models-core', $base . '/js/models/core.js', array( 'scrivener' ) );
		wp_enqueue_script( 'scrivener-models-customizer', $base . '/js/models/customizer.js', array( 'scrivener' ) );
		wp_enqueue_script( 'scrivener-views-core', $base . '/js/views/core.js', array( 'scrivener-models-core' ) );
		wp_enqueue_script( 'scrivener-views-modal', $base . '/js/views/modal.js', array( 'scrivener-models-customizer' ) );
		wp_enqueue_script( 'scrivener-views-sidebar', $base . '/js/views/sidebar.js', array( 'scrivener-models-customizer' ) );
		wp_enqueue_script( 'scrivener-views-frame-preview', $base . '/js/views/frame-preview.js', array( 'scrivener-models-customizer' ) );

		// include bootstrap
		wp_enqueue_script( 'scrivener-bootstrap', $base . '/js/main.js', array( 'scrivener' ) );

		// include CSS
		wp_enqueue_style( 'scrivener', $base . '/css/scrivener.css' );
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

		$base = plugins_url( '', dirname( __FILE__ ) );

		wp_enqueue_script( 'ckeditor',        $base . '/js/ckeditor/ckeditor.js',         array(), '10.0.0', true );
		wp_enqueue_script( 'scrivener-frame', $base . '/js/frame.js',                     array( 'ckeditor', 'jquery' ), '0.1.0', true );
		wp_enqueue_style( 'scrivener',        $base . '/css/scrivener-frame-preview.css', array(), '0.2',    false );

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
		
		// Bail if not in the main query loop
		if ( ! in_the_loop() || defined( 'COMMENTS_TEMPLATE' ) )
			return $title;

		return '<div class="scrivener-title scrivener-focused-element" contenteditable="true">' . $title . '</div>';
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

		// Bail if not in the main query loop
		if ( ! in_the_loop() || defined( 'COMMENTS_TEMPLATE' ) )
			return $content;

		return '<div class="scrivener-content scrivener-focused-element" contenteditable="true">' . $content . '</div>';
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
