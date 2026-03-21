<?php
/**
 * @package Helix Ultimate Framework
 * @author JoomShaper https://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2025 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
*/

defined ('_JEXEC') or die();

// Keep highlighted terms on the search page but prevent click-through highlight in destination URLs.
if (!empty($this->result->route)) {
	$routeUri = new Joomla\CMS\Uri\Uri($this->result->route);
	$routeUri->delVar('highlight');
	$this->result->route = $routeUri->toString();
}

if (!empty($this->result->cleanURL)) {
	$cleanUri = new Joomla\CMS\Uri\Uri($this->result->cleanURL);
	$cleanUri->delVar('highlight');
	$this->result->cleanURL = $cleanUri->toString();
}

require HelixUltimate\Framework\Platform\HTMLOverride::loadTemplate();
