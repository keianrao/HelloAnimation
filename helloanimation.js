
const data = { };

const navButtons = {
	"Contact": undefined,
	"Projects": undefined
};
/*
* Intentionally using undefined. We're not defining them yet,
* but I'd just like to list the identifiers here, for reference.
*/
	
const pages = {
	"Contact": {
		name: undefined
	},
	"Projects": {
		java: {
			containerElem: undefined,
			headerElem: {
				iconElement: undefined,
				headingElement: undefined,
				iconURL: undefined 
				// I think we should define iconURL here and now. As a constant.
			}
		}
	}
};

const NAVBUTTON_CLASS = "js-navbutton";
const SELECTED_NAVBUTTON_CLASS = "js-navbutton-selected";



//  \\  //  \\  //  \\  //  \\  //  \\  //  \\

function setPage(pageName) {
	function changeSelectedNavButton(newSelectedPageName) {
		for (var [pageName, navButton] of Object.entries(navButtons)) {
			navButton.setAttribute(
				"class",
				pageName === newSelectedPageName
					? NAVBUTTON_CLASS + " selected"
					: NAVBUTTON_CLASS
			);
		}
	}

	function makeCurrentPageElementsInvisible() {
		
	}
	
	function makePageElementsVisible(pageName) {
		// Each page has a unique layout, so we're going to hardcode
		// loading logic for each possible page, rather than going generic.
	}

	changeSelectedNavButton(pageName);
	makeCurrentPageElementsInvisible(pageName);
	makePageElementsVisible(pageName);
}



//  \\  //  \\  //  \\  //  \\  //  \\  //  \\

function extractDataFromOriginalHtmlElements() {
	// Extract from 'contact' section.
	data.contact = {};	
	data.contact.name = 
		document.getElementById("contact-name")
			.innerText
			.trim();
			
	// Extract from 'projects' section.
	// This is going to be quite a ride, buckle up..
	data.projects = { java: {}, python: {}, javaScript: {} };
	// Abbreviation: 'PrArtEl' = "project article element"
	// As in, <article class="project" />
	var langPrArtEls = function (languageName) {
		return document
			.getElementById("projects-" + languageName.toLowerCase())
			.getElementsByClassName("project");
	}	
	var extractProjects = function (languageName) {
		for (var prArtEl of langPrArtEls(languageName)) {
			var [ prNameEl, prLinkEl, prDescEl ] = [
				prArtEl.getElementsByClassName("project-name")[0],
				prArtEl.getElementsByClassName("project-link")[0],
				prArtEl.getElementsByClassName("project-description")[0]
				// We'll assume they exist.
			];
			// Each of the elements above should be leaf nodes, with text.
			// So, take their innerText as our data values.
			data.projects[languageName].name = 
				prNameEl.innerText.trim();
			data.projects[languageName].link = 
				prLinkEl.innerText.trim();
			data.projects[languageName].description =
				prDescEl.innerText.trim();
		}
	}
	extractProjects("java");
	extractProjects("python");
	extractProjects("javaScript");
}

function removeOriginalHtmlElements() {
	document.body.textContent = "";
	// Very destructive, doesn't exactly match the function name.. 
	// But within our context, this should be okay, 
	// we have nothing to preserve.
}

function initialiseNewHtmlElements() {
	// The data needs to be ready when this is called.
	
	var contactNavButton = document.createElement("button");
	contactNavButton.innerText = "Contact";
	contactNavButton.setAttribute("onclick", "setPage('Contact')");
	contactNavButton.setAttribute("class", NAVBUTTON_CLASS);
	contactNavButton.setAttribute("id", NAVBUTTON_CLASS + "-contact");
	contactNavButton.setAttribute("alt", "Opens Contact page");
	navButtons["Contact"] = contactNavButton;
	document.body.append(contactNavButton);
	
	var projectsNavButton = document.createElement("button");
	projectsNavButton.innerText = "Projects";
	projectsNavButton.setAttribute("onclick", "setPage('Projects')");
	projectsNavButton.setAttribute("class", NAVBUTTON_CLASS);
	projectsNavButton.setAttribute("id", NAVBUTTON_CLASS + "-projects");
	projectsNavButton.setAttribute("alt", "Opens Projects page");
	navButtons["Projects"] = projectsNavButton;
	document.body.append(navButtons["Projects"]);
	// Initialisation-wise there aren't really any differences between them.
	// Maybe we should break this into a loop over the nav buttons.
}

function moveNavButtonsIntoPlace() {
	const NAVBUTTON_FINAL_TOP = "5%";
	setTimeout(function () {
		var css = navButtons["Contact"].style;		
		css.top = NAVBUTTON_FINAL_TOP;
		css.opacity = 100;
	}, 500);
	setTimeout(function () {
		var css = navButtons["Projects"].style;
		css.top = NAVBUTTON_FINAL_TOP;
		css.opacity = 100;
	}, 750);
	// Should we block here?
}

function renderJavaScriptPage() {
	initialiseNewHtmlElements();
	moveNavButtonsIntoPlace();
	setPage("Contact");
}

function transitionToJS() {
	extractDataFromOriginalHtmlElements();
	removeOriginalHtmlElements();
	renderJavaScriptPage();
}

transitionToJS();
