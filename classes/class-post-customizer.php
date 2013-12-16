<?php

class Post_Customizer {

	/**
	 * @access private
	 * @var Post_Customizer
	 */
	private static $_instance;

	/**
	 * Setup singleton Post_Customizer instance.
	 *
	 * @since 0.1.0
	 */
	private function __construct() {
		add_action( 'wp_ajax_post-customizer', array( $this, 'process_ajax_request' ) );
		add_action( 'admin_enqueue_scripts',   array( $this, 'action_admin_enqueue_scripts' ) );
		add_action( 'init',                    array( $this, 'trick_wp' ), 9 );

		add_filter( 'preview_post_link',  array( $this, 'filter_preview_post_link' ) );
		add_filter( 'admin_post_weiverp', array( $this, 'is_this_real_life' ) );
	}

	/**
	 * Initialize class and return an instance of it.
	 *
	 * @since 0.1.0
	 *
	 * @return Post_Customizer instance.
	 */
	public static function init() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new Post_Customizer;
		}

		return self::$_instance;
	}

	/**
	 * Handle Post Customizer AJAX requests
	 *
	 * @access public
	 * @since 0.1.0
	 */
	public function process_ajax_request() {
		check_ajax_referer( 'post-customizer' );

		if ( empty( $_POST['post_customizer_action'] ) )
			return;

		if ( 'get_sidebar' == $_POST['post_customizer_action'] ) {

			if ( empty( $_POST['post_id'] ) )
				return;

			$data = array(
				'sidebarHTML' => $this->_render_sidebar_data( $_POST['post_id'] ),
			);
		} elseif ( 'save_field' == $_POST['post-customizer_action'] && ! empty( $_POST['field'] ) && ! empty( $_POST['post_id'] ) ) {
			$data = array();
			switch( $_POST['field'] ) {
				case 'post_title':
				case 'post_content':
					wp_update_post( array(
						'ID' => $_POST['post_id'],
						$_POST['field'] => $_POST['data'],
					) );
					$data['changed'] = $_POST['field'];
					$data['value'] = $_POST['data'];
					break;
			}
		} else {
			//Error!
		}

		wp_send_json( $data );
	}

	/**
	 * Render the sidebar for a given post.
	 *
	 * @access protected
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
				<a href="javascript:void(0);" class="button button-primary save"><?php _e( 'Update', 'post-customizer' ); ?></a>
				<img class="update-spinner" src="<?php echo home_url( 'wp-admin/images/wpspin_light.gif' ); ?>" />
				<a href="javascript:void(0);" class="back button close"><?php _e( 'Close', 'post-customizer' ); ?></a>
			</div>

			<div id="customize-title">
				<?php _e( 'You are previewing', 'post-customizer' );?>
				<strong class="post-title"><?php the_title(); ?></strong>
			</div>

			<div class="wp-full-overlay-sidebar-content accordion-container" id="customize-info" tabindex="-1">
				<div id="customize-theme-controls">
					<ul>
						<li id="accordion-section-title_tagline" class="control-section accordion-section top">
							<h3 class="accordion-section-title" tabindex="0"><?php _e( 'Excerpt', 'post-customizer' ); ?></h3>
							<ul class="accordion-section-content">
								<li id="customize-control-excerpt" class="customize-control customize-control-textarea">
									<label>
										<span class="customize-control-excerpt"><?php _e( 'Excerpt:', 'post-customizer' ); ?></span>
										<textarea name="post_excerpt" id="post_excerpt"><?php echo get_the_excerpt(); ?></textarea>
									</label>
								</li>
							</ul>
						</li>
						<li id="accordion-section-colors" class="control-section accordion-section">
							<h3 class="accordion-section-title" tabindex="0"><?php _e( 'Post Thumbnail', 'post-customizer' ); ?></h3>
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
				<a href="#" class="collapse-sidebar button-secondary" title="<?php _e( 'Collapse Sidebar', 'post-customizer' ); ?>">
					<span class="collapse-sidebar-arrow"></span>
					<span class="collapse-sidebar-label"><?php _e( 'Collapse', 'post-customizer' ); ?></span>
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
	 * @access public
	 * @since 0.1.0
	 *
	 * @param string $hook The hook name.
	 */
	public function action_admin_enqueue_scripts( $hook ) {
		if ( 'post.php' != $hook && 'post-new.php' != $hook )
			return;

		$base = plugins_url( '', dirname( __FILE__ ) );

		// Customizer controls.
		wp_enqueue_script( 'customize-controls' );

		// Include the base component.
		wp_enqueue_script( 'post-customizer', $base . '/js/app.js', array( 'backbone' ), '0.1', true );

		$post_customizer_data = array(
			'style_url' => admin_url( 'css/customize-controls.css' ),
			'post_id'   => get_the_ID(),
			'admin_url' => admin_url(),
			'ajaxURL'   => admin_url( 'admin-ajax.php' ),
			'ajaxNonce' => wp_create_nonce( 'post-customizer' ),
		);
		wp_localize_script( 'post-customizer', 'Post_Customizer_Data', $post_customizer_data );

		// Include our dependencies.
		wp_enqueue_script( 'post-customizer-models-core', $base . '/js/models/core.js', array( 'post-customizer' ) );
		wp_enqueue_script( 'post-customizer-models-customizer', $base . '/js/models/customizer.js', array( 'post-customizer' ) );
		wp_enqueue_script( 'post-customizer-views-core', $base . '/js/views/core.js', array( 'post-customizer-models-core' ) );
		wp_enqueue_script( 'post-customizer-views-modal', $base . '/js/views/modal.js', array( 'post-customizer-models-customizer' ) );
		wp_enqueue_script( 'post-customizer-views-sidebar', $base . '/js/views/sidebar.js', array( 'post-customizer-models-customizer' ), '1.0.1' );
		wp_enqueue_script( 'post-customizer-views-frame-preview', $base . '/js/views/frame-preview.js', array( 'post-customizer-models-customizer' ) );

		// Include bootstrap.
		wp_enqueue_script( 'post-customizer-bootstrap', $base . '/js/main.js', array( 'post-customizer' ) );

		// Include CSS.
		wp_enqueue_style( 'post-customizer', $base . '/css/post-customizer.css', '0.2' );
	}

	/**
	 * Filter preview post link.
	 *
	 * @access public
	 * @since 0.1.0
	 *
	 * @param string $link Optional. Preview link. Default empty.
	 * @return string The filtered preview link.
	 */
	public function filter_preview_post_link( $link = '' ) {
		$link = add_query_arg( array( 'action' => 'weiverp', 'p' => get_the_ID() ), admin_url( 'admin-post.php' ) );
		return $link;
	}

	/**
	 * Trick WP into thinking this is a preview.
	 *
	 * LOL.
	 *
	 * @access public
	 * @since 0.1.0
	 */
	public function trick_wp() {
		if ( is_admin() && ! empty( $_GET['action'] ) && $_GET['action'] === 'weiverp' ) {
			$_GET['preview']       = 'true';
			$_GET['preview_id']    = $_GET['p'];
			$_GET['preview_nonce'] = wp_create_nonce( 'post_preview_' . $_GET['p'] );
		}
	}

	/**
	 * Set pagenow to trick autosave.
	 *
	 * @access public
	 * @since 0.1.0
	 */
	public function trick_autosave() {
	?>
		<script type="text/javascript">
		var pagenow = 'post-customizer';
		</script>
	<?php
	}

	/**
	 * Admin post handler to display the preview.
	 *
	 * Is this real life?
	 *
	 * @access public
	 * @since 0.1.0
	 */
	public function is_this_real_life() {
		define( 'WP_USE_THEMES', true );
		define( 'IFRAME_REQUEST', true );
		wp();

		// Disable the default admin bar callback.
		remove_action( 'wp_head', '_admin_bar_bump_cb' );

		// Set the pagenow value to trick autosave.
		add_action( 'wp_head', array( $this, 'trick_autosave' ) );

		$base = plugins_url( '', dirname( __FILE__ ) );

		wp_enqueue_script( 'common' );
		wp_enqueue_script( 'post' );
		wp_enqueue_script( 'autosave' );

		wp_enqueue_script( 'ckeditor', $base . '/js/ckeditor/ckeditor.js', array(), '10.0.0', true );
		wp_enqueue_script( 'post-customizer-frame', $base . '/js/frame.js', array( 'ckeditor', 'jquery' ), '0.1.0', true );
		wp_enqueue_style( 'post-customizer', $base . '/css/post-customizer-frame-preview.css', array(), '0.2',    false );

		// Package data for JS.
		$data = array(
			'post_id'       => get_the_ID(),
			'ajaxNonce'     => wp_create_nonce( 'post-customizer' ),
			'saveNonce'     => wp_create_nonce( 'update-post_' . get_the_ID() ),
			'autosaveNonce' => wp_create_nonce( 'autosave' ),
		);
		wp_localize_script( 'post-customizer-frame', 'Post_Customizer_Data', $data );

		// Wrap the title and content in Post_Customizer ID's
		add_filter( 'the_title',   array( $this, 'filter_the_title'   ), 10, 2 );
		add_filter( 'the_content', array( $this, 'filter_the_content' ) );

		// Pul in the template-loader to output theme-side post-preview
		require( ABSPATH . WPINC . '/template-loader.php' );

		// Remove filters (maybe not necessary)
		remove_filter( 'the_title',   array( $this, 'filter_the_title'   ), 10, 2 );
		remove_filter( 'the_content', array( $this, 'filter_the_content' ) );
	}

	/**
	 * Wrap the_title in a Post_Customizer div.
	 *
	 * @access public
	 * @since 0.1.0
	 *
	 * @param string $title The title.
	 * @param int    $id    Current post ID.
	 *
	 * @return string $title wrapped in a div
	 */
	public function filter_the_title( $title = '', $id = 0 ) {
		// Bail if not in the main query loop
		if ( ! $this->okay_to_add_editor( $id ) ) {
			return $title;
		}

		return '<div data-wp-field="post_title" class="post-customizer-title post-customizer-focused-element" contenteditable="true">' . $title . '</div>';
	}

	/**
	 * Wrap the_content in a Post_Customizer div
	 *
	 * @access public
	 * @since 0.1.0
	 *
	 * @param string $content
	 *
	 * @return string $content Optional. Content wrapped in a div. Default empty.
	 */
	public function filter_the_content( $content = '' ) {
		// Bail if not in the main query loop.
		if ( ! $this->okay_to_add_editor( get_the_ID() ) ) {
			return $content;
		}

		return '<div data-wp-field="post_content" class="post-customizer-content post-customizer-focused-element" contenteditable="true">' . $content . '</div>';
	}

	/**
	 * Checks if we're in the loop and currently filtering values from the
	 * correct post.
	 *
	 * @access protected
	 * @since 0.1.0
	 *
	 * @param int $id The current post ID.
	 *
	 * @return bool Whether it's okay to add the editor wrapper on a filter.
	 */
	protected function okay_to_add_editor( $id = 0 ) {
		return (
			in_the_loop() &&
			! defined( 'COMMENTS_TEMPLATE' ) &&
			(int) $id &&
			(int) $id === (int) get_queried_object_id()
		);
	}

} // Post_Customizer

Post_Customizer::init();
