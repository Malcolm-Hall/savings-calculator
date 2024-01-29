<?php
/*
Plugin Name: Savings Calculator
Plugin URI: https://malcolm-hall.github.io/savings-calculator/
Description: This free savings calculator considers the initial and ending balances, interest rate, and investment time when evaluating various investment circumstances.
Version: 1.0.1
Author: Malcolm Hall
Author URI: https://github.com/Malcolm-Hall
License: GPLv2 or later
Update URI: https://github.com/Malcolm-Hall/savings-calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Savings Calculator";

function display_mh_savings_calculator(){
    $plugin_dir_path = plugin_dir_path(__FILE__);
    $scripts_and_styles = array(
        'assets/fonts/inter-v12-latin-regular.woff2',
        'assets/fonts/inter-v12-latin-500.woff2',
        'assets/fonts/inter-v12-latin-600.woff2',
        'assets/fonts/inter-v12-latin-800.woff2',
        'assets/css/main.css',
        'assets/css/input.css',
        'assets/css/result.css',
        'assets/js/app.js',
        'assets/js/functions.js',
        'assets/js/chart.js',
        'assets/js/calculator.js'
    );

    $html_content = file_get_contents($plugin_dir_path . 'index.html');

    foreach ($scripts_and_styles as $filename) {
        $link = plugins_url($filename, __FILE__);
        $html_content = str_replace('./' . $filename, $link, $html_content);
    }

    return $html_content;
}

add_shortcode( 'mh_savings_calculator', 'display_mh_savings_calculator' );