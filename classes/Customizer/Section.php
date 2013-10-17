<?php

namespace Customizer;

class Section {

	public $id;

	protected $controls = array();

	/**
	 * Add a control to the section
	 *
	 * @param Control $control
	 */
	public function add_control( Control $control ) {

	}

	/**
	 * Get a control object by ID
	 *
	 * @param string $control_id
	 *
	 * @return Control
	 */
	public function get_control( $control_id ) {

	}

	/**
	 * Remove a control by ID
	 *
	 * @param string $control_id
	 */
	public function remove_control( $control_id ) {

	}

}
