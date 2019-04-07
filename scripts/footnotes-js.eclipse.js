/**
 * 
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */
/*
linkInfo method reads the footnote's link information and displays it in a modal string positioned 
at the location of  the foot note.
*******************************************************************************************/
function linkInfoON(footNote, lnkNumber){
//Read the footnote's link information.
  thisFootnote = document.getElementById("fn" + lnkNumber);
  content = thisFootnote.innerHTML;
  start = content.indexOf("&nbsp;&nbsp;") + 12;
  end = content.indexOf("</div>");
  
  //Show help text only if defined.
  if (end>start) {
    helpText = document.getElementById("linkHoverMessage");
    //Assign the help text to the modal string.
    helpText.innerHTML=content.substring(start, end);
    //Get the location of the footnote.
    footNoteRect = footNote.getBoundingClientRect();
    //Display at top of page the modal aligned horizontally left of footnote.
    helpText.style.left=footNoteRect.left.toString()+"px";
    helpText.style.display="block"; 
    //If width compressing too much then align by right rather than left.
    if (helpText.clientHeight > 50) {
      helpText.style.left=0;
      anySpace = footNoteRect.left - helpText.clientWidth;
      if (anySpace>0) helpText.style.left=anySpace.toString()+"px";
    }
   //Vertical align modal above footnote with 10px offset.
    helpText.style.top=(footNoteRect.top-helpText.clientHeight-10).toString()+"px";
  /*window.alert(helpText.clientHeight);*/
  }
}
function linkInfoOFF(){
  helpText = document.getElementById("linkHoverMessage");
  helpText.style.display="none";
}

function linkGOTO(footNote, lnkNumber){
	thisFootnote = document.getElementById("fn" + lnkNumber);
	content = thisFootnote.innerHTML;
	start = content.indexOf("href=") + 6;
	end = content.indexOf("</a>");
	window.alert(content.substring(start, end));
	return false;
}
