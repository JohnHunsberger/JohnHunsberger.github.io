/**
 * scriptcheck will execute only if the browser's javascript execution is enabled.  In some
 * cases it may not be.  This script code will search the page for an element (there can
 * only be one) that has the unique ID "scripted".  This element must be assigned a CSS class
 * name defined in the companion file scriptcheck.css as "hidden".  If this script does get
 * executed then the CSS style "shown" replaces it.  To use this function correctly place the
 * following script at the bottom of the web page.
 * 
 *   <script>scriptcheck();</script>
 * 
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */

function scriptcheck()
{
	var thisDiv = document.getElementById("scripted");
	thisDiv.className = "shown";
}