<?php

namespace Customizer;

class Section {

	protected $uuid = '';
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

	/**
	 * Sets the UUID for this section
	 *
	 * @param string $uuid
	 */
	public function set_uuid( $uuid ) {
		// todo: make sure this is a string before setting it
		$this->uuid = $uuid;
	}

	/**
	 * Gets the UUID for this section
	 *
	 * @param $uuid
	 * @return string
	 */
	public function get_uuid( $uuid ) {
		return $this->uuid;
	}

}
