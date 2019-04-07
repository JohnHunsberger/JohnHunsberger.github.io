/**
 * 
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */


// When the user clicks on <span> (x), close the modal
//  This is called using <span class="closeThisModal" onClick="modalCloseClick()">x</span>
function modalCloseClick() {
	var modalView = document.getElementById('myModal');
	modalView.style.display = "none";
	if (typeof (Storage) !== "undefined") {
		sessionStorage.justOnce = "TRUE";
		//if (sessionStorage.mobile == "TRUE") hint();
	}
}

// When the user clicks anywhere outside of the modal, close it
//  This is called using <body onClick="modalWindowClick(event.target);">
function modalWindowClick(target) {
	var modalView = document.getElementById('myModal');
    if (target == modalView) {
    	modalView.style.display = "none";
    	if (typeof (Storage) !== "undefined") {
    		sessionStorage.justOnce = "TRUE";
    		//if (sessionStorage.mobile == "TRUE") hint();
    	}
    }
}