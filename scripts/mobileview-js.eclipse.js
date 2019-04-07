/**
 * mobileview-js.eclipse.js
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */



/*
 * Certain variables needed by the touch event methods.
 */
	var threshold = 75; //required min distance traveled to be considered swipe
	var allowedTime = 250; // maximum time allowed to travel that distance
	var touchsurface = document.getElementById('touchsurface');
	var startPos={x:0,y:0}; //record the start position of a touch.
	var endPos={x:0,y:0}; //record the end position of a touch.
	var startTime;
	var elapsedTime;
	var page=2; //maintain current page number {1, 2, ...}
	var timer1, timer2;
	
/*
 * For the slider to work all of the page containers must have the same height.  For the 
 * pages to scroll correctly the height must match that of the highest page. In addition
 * the design uses a Splash header which is desired to be static, so the actual height will
 * be the window height less the Splash.
 */
function loadView(){
	var splash = document.getElementById("MobileSplash");
	var viewer = document.getElementsByClassName("visualContainer");
	var myslider = document.getElementsByClassName("contentContainer");
	
	/*
	 * pages will be an array element that has as many entries as there are defined <div>s
	 * that have the class name "container".  In this application there are only two with
	 * id="master" and id="detail".
	 */
	var pages = document.getElementsByClassName("container");
	
	/*
	 * The Chrome mobile browser consumes space at the top of the window for the url path.  The
	 * window.outerHeight includes this additional vertical space that is not really available
	 * to the site.  Consequently the computed height of the container is too much by the height
	 * of the tool strip.  The window.innerHeight works.
	 *    http://www.w3schools.com/jsref/prop_win_innerheight.asp
	 */
	var viewheight = window.innerHeight;
	var splashheight = splash.clientHeight;
	var balance = viewheight - splashheight;
	
	viewer.height = balance;
	myslider[0].style.height = balance;
	var page1 = pages[0]; /*page1 will point to the 'master' div.*/
	page1.style.height = balance + "px";
	var page2 = pages[1]; /*page2 will point to the 'detail' div.*/
	page2.style.height = balance + "px";
	
	/*
	 * switchStart == null will display pageTwo (Detail) directly.  This should only happen once
	 * when indexMobile.html is initially loaded.
	 * switchStart == TRUE will first display the pageOne (Master) but then transition
	 * to pageTwo (Detail).
	 */
	if (typeof (Storage) !== "undefined") {
		//window.sessionStorage values are always stored as string.
		var slide = document.getElementById("slider");
		if (sessionStorage.getItem("switchStart") === null) {
			//remove the slider setting for left position of the slider.
			slide.style.transition = "";
			slide.style.transitionDuration = "0";
			slide.style.WebkitTransitionDuration = "0";
			slide.style.left = "-100%"; //show page2 (Detail)
			sessionStorage.switchStart = "TRUE"; //just set to some value to make it defined.
		} else {
			/*
			 * Establish slider setting for page1 position (Master) of the slider, then slide to page2 (Detail).
			 * The contentContainer has the assigned 'transition-duration' defined to transition from page1 to page2.
			 */
			slide.style.transition = "left";
			slide.style.transitionDuration = "1s";
			slide.style.WebkitTransitionDuration = "1s";
			timer1 = window.setTimeout(hintOff, 250); //pause 250 milliseconds then transition.
		}
	}
}

/*
 * Upon closing of the modal notification, hint to the user that they can swipe right to view 
 * more information.
 */
function hint(){
	if (typeof (Storage) !== "undefined") {
		if (typeof (sessionStorage.hint) == "undefined"){
			/*If not defined then not previously hinted... do hint.*/
			timer1 = window.setTimeout(hintOn, 500);
			timer2 = window.setTimeout(hintOff, 2000);
			sessionStorage.hint = "TRUE"; /*define hint*/
		}
	}
}

function hintOn(){
	var slide = document.getElementById("slider");
	if (page==2) slide.style.left = "-85%";
}

function hintOff(){
	var slide = document.getElementById("slider");
	if (page==2) slide.style.left = "-100%";
}

function showDirectory(){
	var slide = document.getElementById("slider");
	slide.style.transition = "left";
	slide.style.transitionDuration = "1s";
	slide.style.WebkitTransitionDuration = "1s";
	slide.style.left = "0";
}

/*
 * beginTouch(event) function is assigned to the ontouchstart event of the visual container.
 */
function beginTouch(event){
   	endPos=startPos={x:event.touches[0].pageX, y:event.touches[0].pageY};
   	startTime = new Date().getTime(); /* milliseconds since midnight Jan 1 1970 */
}

/*
 * whileTouch(event) function is assigned to the ontouchmove event of the visual container.
 */
function whileTouch(event){
   	elapsedTime = new Date().getTime() - startTime;
   	endPos={x:event.touches[0].pageX, y:event.touches[0].pageY};
}

/*
 * endTouch(event) function is assigned to the ontouchend event of the visual container.
 */
function endTouch(event){
   	var direction = "NONE";
   	if (elapsedTime <= allowedTime){
   		distanceX = startPos.x - endPos.x;
   		distanceY = startPos.y - endPos.y;
   		vertical = Math.abs(distanceY);
   		horizontal = Math.abs(distanceX);
   		if (horizontal > vertical){
   			if (horizontal >= threshold) direction = (distanceX > 0) ? "LEFT" : "RIGHT";
   		} else {
   			if (horizontal >= threshold) direction = (distanceY > 0) ? "UP" : "DOWN";
   		}
   	}
   	if (direction != "NONE") swiped(direction);
}

/*
 * The swiped(direction) function will change between adjacent pages stacked horizontally within 
 * the slider element.  To make the change visually appealing the transition function is used.
 */
function swiped(direction){
	clearTimeout(timer1);
	clearTimeout(timer2);
	var slide = document.getElementById("slider");
	if (direction == "LEFT"){
		if (page != 2){
			slide.style.left = "-100%";
			page = 2;
		}
	} else if (direction == "RIGHT"){
		slide.style.left = "0";
		page = 1;
	}
}

/*
 * changeView is used by in-page hyperlinks to display the new web content without first displaying 
 * its page1 (Master) view.  It simply switches to the new page without any transition effect.
 */
function changeView(newview){
	noTransition();
	window.location=newview;
}

/*
 * noTransition sets conditions to eliminate the transition effect when the new view
 * is loaded.  Strangely the mobile-Capability body onhashchange event is not
 * being triggered
 */
function noTransition() {
	sessionStorage.removeItem('switchStart');
}
