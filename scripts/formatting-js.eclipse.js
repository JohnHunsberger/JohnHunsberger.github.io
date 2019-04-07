/*
 * formatting-js.eclipse.js file contains a collection of javascript functions that are designed by John Hunsberger 
 * for the purpose of formatting the display of page content that uses the Master-Detail presentation model.  This 
 * and all other web content on this site was hand written by  John Hunsberger to demonstrate some simple, perhaps 
 * useful techniques and to highlight some issues as well.  This content is open for anyone to copy.  If you have 
 * questions or opinions about this content feel free to contact me.  The ideas presented are not my invention, they 
 * are my application.
 */

/* 
 * Design Notes:
 *   1. The window.alert("some text"); help debug. https://www.w3schools.com/js/js_popup.asp
 */

var ContainerMaxWidth = 900; //global maximum width of scripted container <div>'s width in the <body> 
/*
 * The #master element is assigned a width of 140px in MasterDetail.css.  The <body> is assigned padding of 20px top
 * right bottom and left.  That requires adding 40px to the MasterWidth to adjust for that.
 */
var MasterWidth = 140 + 40; 
var BodyExcess = 0; //global to manage max width of scripted container <div>'s padding in the <body>
var BodyDiff = 0; //one half of BodyExcess to be split to either side of the scripted container <div>

/**
 * The debouncedResize() method is used as the method for the window resize event.  The function variable
 * 'debouncedResize' is assigned the debounce() method that is passed three parameters.  The first is an
 * anonymous function that calls the formatter() method.  The second is a millisecond debounce delay.  The
 * third is a boolean that sets whether the formatter method is executed before or after the debounce delay.
 */
var debouncedResize = debounce(function() {
	formatter();
}, 100, false);

/**
 * The throttledResize() method is used as the method for the window resize event.  The function variable
 * 'throttledResize' is assigned the throttle() method that is passed two parameters.  The first is an
 * anonymous function that calls the formatter() method.  The second is a millisecond throttle delay.
 */
var throttledResize = throttle(function() {
	formatter();
}, 100);

/**
 * The throttle() method's return statement is an anonymous function that, as long as it 
 *  continues to be invoked, will execute the deferred function until the delay time 'wait' has
 *  expired.
 * 
 *   'func' is the desired function to call.
 *   'wait' is numeric milliseconds delay.
 */
function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last, deferTimer;
	return function() {
		var context = scope || this;
		var now = +new Date, args = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer); //terminate any pending function.
			deferTimer = setTimeout(function() {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}

/**
 * The debounce() method's return statement is an anonymous function that, as long as it 
 *  continues to be invoked, will resubmit the deferred function to a timer delay until the 
 *  calls stop.  When the delay time 'wait' expires the function 'func' will execute.
 * 
 *   'func' is the desired function to call.
 *   'wait' is numeric milliseconds delay.
 */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null; //Clear the timer and pending execution.
			if (!immediate) func.apply(context, args);  //call func() with arguments
		};
		//the boolean of any non-real value is false, in this case a null is false.
		var callNow = immediate && !timeout; //if immediate AND timeout ID is null (unassigned)
		clearTimeout(timeout); //cancel any pending call.
		timeout = setTimeout(later, wait); //resubmit the call with delay.  if no successive debounce call then timeout will execute func.
		if (callNow) func.apply(context, args); //when desired at the start of the delays.
	};
};

/**
 * The formatter method will configure the index page according to the screen
 * size as one of {"wide" "medium" "small" or "narrow"}.
 * 
 * Design Notes:  
 *     1. I found that if the browser is allowed to execute formatter() continuously while the display dimensions are 
 *        being changed that the resulting resize information my become corrupted.  The solution to this is to only 
 *        execute formatter only at the final call in the event sequence.  There is no way that I could figure out
 *        how to do this so I used brahn's solution at:
 *        http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
 *        
 *        
 */
function formatter() {
	/*
	 * Define the configurations based on the display width.
	 */
	var wideElements = {
		0 : "wideformat1",
		1 : "wideformat2"
	};
	var smallElements = {
		0 : "smallformat1",
		1 : "smallformat2"
	};
	var iconImages = {
		0 : "images/Hoga.png",
		1 : "images/HogaMedium.png"
	};
	var wideElementDisplay = {
		0 : "shown",
		1 : "hidden"
	};
	var smallElementDisplay = {
		0 : "hidden",
		1 : "shown"
	};
	
	/*
	 * Set the default configuration indexes.  (Index into configurations above.)
	 */
	var iconImage = 0;
	var elementDisplayChoice = 0;

	/*
	 * screensize() returns a characterization of the current display screen
	 * size. Based on the characterization the iconImage and elementDisplayChoice
	 * can be selected.
	 */
	switch (screensize()) {
	case "wide": {
		iconImage = 0;
		elementDisplayChoice = 0;
		break; // default to the wide presentation in the page source.
	}
	case "medium": {
		iconImage = 1;
		elementDisplayChoice = 0;
		break;
	}
	case "small": {
		iconImage = 1;
		elementDisplayChoice = 1;
		break;
	}
	case "narrow": {
		iconImage = 1;
		elementDisplayChoice = 1;
		break;
	}
	}// switch
	
	/*
	 * set Icon source from iconImages array based on the index value iconImage and assign view className to elements
	 * in wideElements and smallElements arrays based on selected index values elementDisplayChoice.
	 */
	document.getElementById("companyIcon").src = iconImages[iconImage];
	for (formatID in wideElements) {
		thisElement = document.getElementById(wideElements[formatID]);
		thisElement.className = wideElementDisplay[elementDisplayChoice];
	}
	for (formatID in smallElements) {
		thisElement = document.getElementById(smallElements[formatID]);
		thisElement.className = smallElementDisplay[elementDisplayChoice];
	}
	/*
	 * Perform a resize to the current display boundary of the browser.
	*/
	resizeDetailWidth();
	resizeMasterDetailHeight();
}

/**
 * The screensize method will return a string based on the width in pixels that
 * is either "wide" "medium" "small" or "narrow". Note that the
 * Document.documentElement read-only property returns the Element that is the
 * root element of the document, in this case the window.
 */
function screensize() {
	var iW = widthOfBody();
	var wType = "wide";
	if (675 < iW && iW < 800)
		wType = "medium";
	if (128 < iW && iW <= 675)
		wType = "small";
	if (iW <= 128)
		wType = "narrow";
	return wType;
}

function getUserAgent() {
	return navigator.userAgent;
}

/**
 * The expression for w is evaluated from left to right, each value is tested for Truthy and first value that has
 * Truthy is assigned to w.  Alternately Math.min/max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth)
 * could be used provide the values are all Truthy (window.innerWidth && document.documentElement.clientWidth && document.body.clientWidth).
 * 
 * @returns
	var w = window.innerWidth || document.documentElement.clientWidth
			|| document.body.clientWidth;
 */
function widthOfBody() {
	var w = (window.innerWidth && document.documentElement.clientWidth) ? Math.max(window.innerWidth, document.documentElement.clientWidth) :
			window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return w;
}

/**
 * The HTML DOM offsetHeight property returns the viewable height of an element in pixels, including padding, 
 * border and scrollbar, but not the margin.  The Document.documentElement read-only property returns the Element 
 * that is the root element of the document (for example, the <html> element for HTML documents).
 * 
 * @returns height
	var h = window.innerHeight || document.documentElement.clientHeight
			|| document.body.clientHeight;
 */
function heightOfBody() {
	var h = (window.innerHeight && document.documentElement.clientHeight) ? Math.max(window.innerHeight, document.documentElement.clientHeight) :
		    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return h;
}

function heightOfPrivate() {
	var priv = document.getElementById("privateReference");
	return priv.offsetHeight;
}

/**
 * The HTML DOM offsetHeight property returns the viewable height of an element in pixels, including padding, 
 * border and scrollbar, but not the margin.
 * 
 * @returns height
 */
function heightOfHeader() {
	var head = document.getElementById("header");
	return head.offsetHeight;
}

/**
 * The HTML DOM offsetHeight property returns the viewable height of an element in pixels, including padding, 
 * border and scrollbar, but not the margin.
 * 
 * @returns height
 */
function heightOfFooter() {
	var foot = document.getElementById("footer");
	return foot.offsetHeight;
}

/**
 * The resizeMasterDetailHeight() method will set both the master and detail div
 * elements to use the available height of the page's body.
 */
function resizeMasterDetailHeight() {
	var v_0 = heightOfPrivate();
	var v_1 = heightOfBody() - 20; //Reduce by twenty to adjust for the margin top and bottom.
	//Reduce the height of the body by the header/footer/space
	var v_2 = heightOfHeader();
	var v_3 = heightOfFooter();
	var v_4 = 0; //if debug data display then use = heightOfdisplayDebugInfo();
	var adjust = v_1 - (v_0 + v_2 + v_3 + v_4);
	
	var thisMaster = document.getElementById("master");
	thisMaster.style.height = adjust + "px";
	var thisDetail = document.getElementById("detail");
	thisDetail.style.height = adjust + "px";
}

/**
 * The HTML DOM offsetHeight property returns the viewable height of an element in pixels, including padding, 
 * border and scrollbar, but not the margin.
 * 
 * @returns height
 */
function heightOfdisplayDebugInfo(){
	var thisDebugInfo = document.getElementById("displayDebugInfo");
	return thisDebugInfo.offsetHeight;
}

/**
 * The resizeDetailWidth() method will set the detail div element to use the
 * remaining width after the master occupies a fixed 140px.  The detail width
 * must be restricted to the maximumDetailWidth.
 */
function resizeDetailWidth() {
	var DetailWidth = widthOfBody();
	BodyExcess = DetailWidth - ContainerMaxWidth; //Subtract out the maximum width to compute the excess space in the body.
	DetailWidth -= (MasterWidth+1); /* Compute the detail's available width to allow it to align to the right of the master. */

	/*
	 * The BodyExcess will be greater than zero whenever the fixed display width is less than the available
	 * display space of the user's browser.  In this case add half of the excess as buffer to either side of
	 * the container "scripted".
	 * 
	 * Design Note: 
	 *   1. As a user is resizing, this method will be repeatedly called to recompute the border and detail width.
	 *      However the container actual width may be reduced after the DetailWidth value is obtained from widthOfBody();
	 *      A consequence is that the assigned padding on scripted container is too small for the computed padding
	 *      plus the computed detail width.  Then the floated detail will be displayed beneath the master <div>.
	 *   2. Once the BodyExcess is <= 0 the adjustment is no longer applied.  If the above condition should happen while
	 *      transitioning from the excess condition then the foobar display will persist until the excess condition is
	 *      recreated.  Recovery is not possible while no excess is present.
	 *   3. Refer to https://boutell.com/newfaq/creating/threecolumnlayout.html
	 *      In this reference the recommended approach is to "center" the container 'scripted' rather than using a
	 *      variable padding as I've done.
	 */
	var thisContainer = document.getElementById("scripted");
	if (BodyExcess > 0) {
		BodyDiff = (BodyExcess / 2);
		if (BodyDiff >= 1) {
			DetailWidth -= BodyExcess;
			/* By increasing padding it will decrease available content display space.  So the available width
			 * in DetailWidth needs to be decreased by the BodyExcess AND the BodyExcess amount must be split in half and assigned
			 * to the left and right padding of the 'scripted' container.
			 */
			var newPadding = "0px " + BodyDiff + "px 0px " + BodyDiff + "px";
			thisContainer.style.padding = newPadding;
		}
	} else {
		/* Because the scripted container may have had padding attached it must always be removed here.
		 */
		thisContainer.style.padding = "0px 0px 0px 0px";
	}
}


/**
 * The isFullScreen() function looks at the left edge of the currently displayed window and makes
 * a guess at whether the window is full screen or not.  It is not fool proof in that there are
 * untested browsers.
 * @returns
 */
function isFullScreen() {
    var leftEdge = window.screenLeft;
    if (typeof leftEdge === 'undefined' ) {
    	leftEdge = window.screenX;
    }
    return (leftEdge <= 0) ? "maximized" : "other";
}
