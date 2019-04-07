/**
 * master-js.eclipse.js contains special event driven methods used by the master division on the main page.
 * 
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */


   /* mouseOverColors is an array of object in which each object is an array of objects.  To
    * get a color for one of {introColors, capableColors, capableListColors} use getColor() method.
    */
   var mouseOverColors = {introColors:{mouseOut:"#e2e5e1", mouseOver:"#ffffae"},
                          capableColors:{mouseOut:"#e2e5e1", mouseOver:"#ffffae"},
                          capableListColors:{mouseOut:"white", mouseOver:"yellow"},
                          subListColors:{mouseOut:"white", mouseOver:"yellow"}
                          };
   /* getColor() method returns the desired background color for the named object's specified state.
    * object = one of {introColors, capableColors, capableListColors}
    * state = one of {mouseOut, mouseOver}
    */
   function getColor(object, state){
		var thisObject = mouseOverColors[object];
		var thisBackgroundColor = thisObject[state];
		return thisBackgroundColor;
   }

   /* mouseActivity() method services the onmouseOver event for the table cells that can respond to a user click
    * event.  For the cell specified by 'thisElement' this method will set the cell's background color to the color
    * specified by 'thisColor'.
	*/
   function mouseActivity(thisElement,thisColor){
	   thisElement.style.backgroundColor = thisColor;
   }
   
   /*
    * mouseClick method implements the onClick event for the master division content in the main
    * page.  thisElement identifies the calling element from which an ID is obtained.  The ID of the
    * element is used to index into the 'cellIDs' array that contains the page link to display in
    * the Detail frame of the main page.  controller is true when the element controls a group
    * of twisty items and false when it does not.  If controller is true then the twisty() method
    * is called for the element.
    * 
    * Design Notes:
    * 1. There are different ways to construct arrays.
    *    var cars = ["Saab", "Volvo", "BMW"]; is a simple array of objects with default index values.
    *    var person = {firstName:"John", lastName:"Doe", age:46}; is an array of objects.
    *    ----
    *    In the 'cars' case the index is 0, 1, 2... In the 'person' case the label before the ':' is the index.
    *    The 'in' operator looks for the "index" so in cars 'in' finds 0, 1, and 2.  In person 'in' finds 
    *    firstName, lastName and age.  In either cars or person the array is indexed using the index value
    *    either implied in cars or explicit in person.
    * 2. Here a reference is obtained to the 'detailframe' iFrame and the 'src' is reassigned.
    * 3. The onClick event must be added to each cell to execute this method "mouseClick(this)"
    * 4. Each cell in the master that implements a mouse click event must be assigned an ID that is used\
    *    in this method to index the cellIDs array.
    * 5. The cellIDs array is used to map the calling cell's assigned ID to a specific HTML file to be
    *    displayed in the detail frame.  When the cell's ID is not present in this array there is simply
    *    no associated HTML file to that click event.
    */
   function mouseClick(thisElement, controller){
	   var cellIDs = {	masterIntro:"HTML_scripted/scripted-Intro.html", 
			   			masterHistory: "HTML_unscripted/unscripted-History.html",
						masterCapability:"HTML_unscripted/unscripted-Capability.html",
						capabilityProjects:"HTML_unscripted/unscripted-Projects.html",
						capabilityEngineering:"HTML_unscripted/unscripted-Engineering.html",
						capabilityProduct:"HTML_unscripted/unscripted-Products.html",
						capabilityEquipment:"HTML_unscripted/unscripted-Equipment.html",
	                    introductionContacts:"HTML_unscripted/unscripted-Contacts.html",
	                    privateReference:"HTML_unscripted/unscripted-Bookmarks.html",
	                    referenceAbout:"HTML_unscripted/unscripted-AboutThisPage.html",
	                    referenceToolChains:"HTML_unscripted/unscripted-ToolChains.html",
	                    interestQuantum:"HTML_scripted/scripted-Quantum Introduction.html",
	                    historyQuantum:"HTML_scripted/scripted-Quantum.html",
	                    statisticsQuantum:"HTML_scripted/scripted-Quantum Statistics.html"};            
	   var ID = thisElement.id;
	   //window.alert(cellIDs[ID]); //As stated, the ID for cellIDs is one of {masterIntro, masterAlternate}
	   var detailIframe = window.parent.document.getElementById("detailframe");
	   //window.alert(detailIframe.id); //This verified the iframe of the containing document was actually referenced.
	   if (ID in cellIDs) detailIframe.src=cellIDs[ID]; //This reassigns to one of {scripted-Intro.html, scripted-Alternate.html}
	   if (controller == true){
		   twisty(thisElement);
	   }
   }
