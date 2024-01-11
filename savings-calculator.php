<?php
/*
Plugin Name: Savings Calculator
Plugin URI: https://malcolm-hall.github.io/savings-calculator/
Description: This free savings calculator considers the initial and ending balances, return rate, and investment time when evaluating various investment circumstances.
Version: 1.0.0
Author: Calculator.io, Malcolm Hall
Author URI: https://github.com/Malcolm-Hall
License: GPLv2 or later
Update URI: https://github.com/Malcolm-Hall/savings-calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Savings Calculator";

function display_ci_savings_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Savings Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_savings_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_savings_calculator', 'display_ci_savings_calculator' );