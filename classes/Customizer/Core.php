<?php

namespace Customizer;

abstract class Core {

	protected $sections = array();

	/**
	 * Add a section
	 *
	 * @param Section $section
	 */
	public function add_section( Section $section ) {

	}

	/**
	 * Get a section by ID
	 *
	 * @param string $section_id
	 *
	 * @return Section
	 */
	public function get_section( $section_id ) {

	}

	/**
	 * Remove a section by ID
	 *
	 * @param string $section_id
	 */
	public function remove_section( $section_id ) {

	}

}
