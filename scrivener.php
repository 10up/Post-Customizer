<?php
/**
Plugin Name: Scrivener
Plugin URI: http://10up.com
Description: A WordPress plugin to enhance the post editor preview, mainly through proof of concept.
Version: 0.1.0
Author: 10up
Author URI: http://10up.com
License: GPLv2 or later
 */

if ( ! class_exists( '\\Composer\\Autoload\\ClassLoader' ) ) {
	// include our default customizer classes
	include_once( __DIR__ . '/classes/Customizer/Section.php' );
	include_once( __DIR__ . '/classes/Customizer/Core.php' );
	include_once( __DIR__ . '/classes/Scrivener/Core.php' );
}
