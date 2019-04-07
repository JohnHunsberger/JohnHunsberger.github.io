/**
 * events contains special event driven methods that are globally used.
 * 
 */

/*
 * function twisty() takes a DOM (Document Object Model) element that has been assigned either the "opened" or "closed" style 
 * class as an argument.  The opened and closed styles are not defined as a style, they are used to record state.  The element 
 * is expected to contain a text string that begins with either an openedTriangle or a closedTriangle, however this is not
 * required.  If present, this may be the only character in the element's string.  In addition the element must be assigned 
 * a class name of the unique ID of the element it controls.  The unique id must begin with "id".  This class name is not 
 * defined as a style.  It is used to record data.
 * 
 * As just mentioned the element passed will control the visibility of another element that is assigned that unique ID value.  
 * It is convenient to use the bold <b></b> elements to permit the class assignments and include the onclick event assignment 
 * to the twisty character that is part of the line text.  If the twisty character is not present it will not impact the
 * execution of the twisty function.
 * 
 * The controlled element must be assigned either the class "shown" or "hidden".  The onclick event will execute this method
 * and the class assigned to the controlled element will be toggled between shown and hidden.  The twisty character displayed
 * in the controlling element will also be toggled between closedTriange and openedTriangle.  The shown and hidden style classes
 * are recorded in styles/Formatting.css.
 * 
 *  List Example: Each element of a description list <DL> is a description term <DT>.  The design uses the description term 
 *  to control the display of the following description list which includes the region to either be displayed or not.  When
 *  the DL id="id00001" becomes class="hidden" that element and all contained elements will not be displayed by the browser.
 *  <DL>
 *    <DT>
 *      <b class="id000001 opened" style="cursor: pointer;" onclick="twisty(this)">
 *        &#x025BE;&nbsp;</b>
 *      First Item
 *    </DT>
 *    <DL id="id00001" class="shown">
 *      ...Region to be either displayed or hidden...
 *    </DL>
 *  </DL>
 *    
 * 
 * Design Note:
 *   1. The easiest way to determine if something is truthy is to determine that it’s not falsey.
 *   2. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */
function twisty(element) {
  var closedTriangle = String.fromCharCode(9656) /* "&#x025B8"; &dtrif; &blacktriangledown;*/
  var openedTriangle = String.fromCharCode(9662) /*"&#x025BE"; "&rtrif; &blacktriangleright;*/
  var assignedTriangle = "";
  var widgetClassNames = element.className;
  var associateIDName = getAssociateId(widgetClassNames); /*Extract id of controlled element*/
  var associate = document.getElementById(associateIDName);
  
  /*
   * If associate is null then this controller has no controlled list.  The usual way to check
   * for null is to check for 'falsey' which incudes {false, undefined, null, "", 0, NaN}.
   */
  if (!associate) return;  //Only if associate is Falsey will !associate cause a return.

  /*
   * Toggle the current state of the controller element.
   */
  var pos = widgetClassNames.indexOf("opened");
  if (pos > -1){
    widgetClassNames = widgetClassNames.replace("opened","closed");
    assignedTriangle = closedTriangle;
  } else {
    widgetClassNames = widgetClassNames.replace("closed","opened");
    assignedTriangle = openedTriangle;
  }
  element.className = widgetClassNames;
  /*
   * If necessary toggle the twisty character.
   */
  element.innerHTML = updateText(element.innerHTML, assignedTriangle);
  /*
   * Change the assigned style {shown, hidden} of the controlled element.
   */
  var associateClassName = associate.className;
  pos = associateClassName.indexOf("shown");
  if (pos > -1){
    associateClassName = associateClassName.replace("shown","hidden");
  } else {
    associateClassName = associateClassName.replace("hidden","shown");
  }
  associate.className = associateClassName;
}

/*
 * function getAssociateId() method takes a string of class names as an argument and returns the class name that begins
 * with "id".  This must be the ID of the element being controlled.
 */
function getAssociateId(classString) {
  var length = classString.length;
  var associateID = "";
  var beginning = classString.indexOf("id");
  var ending = 0;
  if (beginning > -1){
    for (ending = beginning + 2; ending < length; ending++){
      if (classString.charAt(ending) == ' ') break;
    }
    associateID = classString.substring(beginning,ending);
  }
  return associateID;
}

/*
 * function updateText() examines the string obtained from the element for the presence of the twisty character.
 * If found then it is replaced with the character passed in 'twistyCharacter'.  If not then no twisty
 * character is added.
 */
function updateText(string, twistyCharacter){
	var closedTriangle = String.fromCharCode(9656) /* "&#x025B8"; &dtrif; &blacktriangledown;*/
	var openedTriangle = String.fromCharCode(9662) /*"&#x025BE"; "&rtrif; &blacktriangleright;*/
	var newString = string;
	var char = string.substring(0,1);
	if (char == closedTriangle || char == openedTriangle){
	  	newString = string.replace(char, twistyCharacter);
	}
	return newString;
}

/*
 * HTML DOM Touch Events
 *	Event			Description	DOM
 *	ontouchcancel	The event occurs when the touch is interrupted	 
 *  ontouchend		The event occurs when a finger is removed from a touch screen	 
 *  ontouchmove		The event occurs when a finger is dragged across the screen	 
 *  ontouchstart	The event occurs when a finger is placed on a touch screen
 *  
 * To use the HTML DOM addEventListener() method the following:
 *   1. Syntax: element.addEventListener(event, function, useCapture)
 *   2. event: Required. A String that specifies the name of the event.
 *        NOTE: Do not use the "on" prefix. For example, use "click" instead of "onclick".
 *   3. function: Required. Specifies the function to run when the event occurs.
 *   4. useCapture: Optional. A Boolean value that specifies whether the event should be executed 
 *        in the capturing or in the bubbling phase.
 * Design NOTES:
 *   1. In the following code I chose to not use the addEventListener() method because I despise
 *      coding style that hides intent and in this instance I believe that it is more clear that
 *      a particular element has an attached event implemenetation if the element formally uses
 *      the "on..." assignment property.
 */


