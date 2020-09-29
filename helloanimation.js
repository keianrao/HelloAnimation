
const data = { };

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

function renderJavaScriptPage() {

}

function transitionToJS() {
	extractDataFromOriginalHtmlElements();
	// removeOriginalHtmlElements();
	// renderJavaScriptPage();
}

transitionToJS();
