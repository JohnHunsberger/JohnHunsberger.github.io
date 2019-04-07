/**
 * 
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */


/**
 * detectMobile uses the string match method which uses string regular expressions 'RegExp' to define matches. 
 * The syntax for a regular expression is /pattern/flags. 
 *    Permissible flags are any combination of the following: 
 *    g global match 
 *    i ignore case 
 *    m multiline; treat beginning and end characters (^ and $) as working over multiple lines 
 *      (i.e., match the beginning or end of each line (delimited by \n or \r), not only the 
 *      very beginning or end of the whole input string) 
 *    u unicode; treat pattern as a sequence of unicode code points 
 *    y sticky; matches only from the index indicated by the lastIndex property of this regular 
 *      expression in the target string (and does not attempt to match from any later indexes). 
 * Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp for more details.
 */
function detectMobile() {
	var agentValue = navigator.userAgent;
	return agentValue
			.match(/Android|Opera Mini|Mobile|Symbian|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? true
			: false;
}