import "./main.css";

import {
	SkynetClient
} from "skynet-js";

const client = new SkynetClient();

window.createBlogPage = function(blogPage) {
	const pageContent = blogPage;

	const blogFile = {
		"index.html": new File([pageContent], "index.html", {type: "text/html"}),
	}

	try {
		(async () => {
			const {skylink} = await client.uploadDirectory(blogFile, "blogFile");
			let displayLink = "/" + skylink + "/";
			document.getElementById("SkynetLink").href=displayLink;
			document.getElementById("SkynetLink").text=displayLink;
		})();
	} catch(error) {
		alert(error);
	}
}

window.makeFile = function() {
	var iFrame = document.getElementById("previewFrame");
				
	var file = document.implementation.createHTMLDocument("Preview.html");
			
	file.body.style.backgroundColor = iFrame.contentWindow.document.body.style.backgroundColor;
	file.body.style.padding = "0";
	file.body.style.margin = "0";
	file.body.style.border = "0";
				
	var previewMenu = file.createElement("div");
	previewMenu.style.backgroundColor = iFrame.contentWindow.document.getElementById("previewMenu").style.backgroundColor;
	previewMenu.style.overflowWrap = "anywhere";
	previewMenu.style.padding = "2% 2% 2.5% 3%";
	previewMenu.style.margin = "0";
	previewMenu.style.border = "0";
				
	var previewHeaderText = file.createElement("h1");
	previewHeaderText.style.lineHeight = "1.4";
	previewHeaderText.style.color = iFrame.contentWindow.document.getElementById("previewHeaderText").style.color;
	previewHeaderText.style.fontSize = "40px";
	previewHeaderText.style.padding = "0";
	previewHeaderText.style.margin = "0";
	previewHeaderText.style.border = "0";
			
	previewHeaderText.innerHTML = iFrame.contentWindow.document.getElementById("previewHeaderText").innerHTML;
				
	var previewArticleHeader = file.createElement("div");
	previewArticleHeader.style.padding = "3% 0 4.5% 3.1%";
	previewArticleHeader.style.margin = "0";
	previewArticleHeader.style.border = "0";
				
	var previewName = file.createElement("p");
	previewName.style.color = iFrame.contentWindow.document.getElementById("previewName").style.color;
	previewName.style.fontSize = "16px";
	previewName.style.float = "left";
	previewName.style.width = "fit-content";
	previewName.style.padding = "0";
	previewName.style.margin = "0";
	previewName.style.border = "0";
				
	previewName.innerHTML = iFrame.contentWindow.document.getElementById("previewName").innerHTML;
				
	var previewDivider = file.createElement("p");
	previewDivider.style.color = iFrame.contentWindow.document.getElementById("previewDivider").style.color;
	previewDivider.style.fontSize = "16px";
	previewDivider.style.float = "left";
	previewDivider.style.width = "fit-content";
	previewDivider.style.padding = "0 1.5%";
	previewDivider.style.margin = "0";
	previewDivider.style.border = "0";
				
	var previewDate = file.createElement("p");
	previewDate.style.color = iFrame.contentWindow.document.getElementById("previewDate").style.color;
	previewDate.style.fontSize = "16px";
	previewDate.style.float = "left";
	previewDate.style.width = "fit-content";
	previewDate.style.padding = "0";
	previewDate.style.margin = "0";
	previewDate.style.border = "0";
	previewDate.style.fontStyle = "italic";
			
	previewDate.innerHTML = iFrame.contentWindow.document.getElementById("previewDate").innerHTML;
				
	var previewArticle = file.createElement("div");
	previewArticle.style.fontSize = "18px";
	previewArticle.style.lineHeight = "1.5";
	previewArticle.style.overflowWrap = "anywhere";
	previewArticle.style.padding = "0 3%";
	previewArticle.style.margin = "0";
	previewArticle.style.border = "0";
				
	var previewArticleText = file.createElement("p");
	previewArticleText.style.color = iFrame.contentWindow.document.getElementById("previewArticleText").style.color;
	previewArticleText.style.padding = "0";
	previewArticleText.style.margin = "0";
	previewArticleText.style.whiteSpace = "pre-wrap";
				
	previewArticleText.innerHTML = iFrame.contentWindow.document.getElementById("previewArticleText").innerHTML;
				
	previewMenu.appendChild(previewHeaderText);
		
	previewArticleHeader.appendChild(previewName);
	previewArticleHeader.appendChild(previewDivider);
	previewArticleHeader.appendChild(previewDate);
				
	previewArticle.appendChild(previewArticleText);
				
	file.body.appendChild(previewMenu);
	file.body.appendChild(previewArticleHeader);
	file.body.appendChild(previewArticle);
		
	createBlogPage(file);
	displayPopUp();
}

window.displayPopUp = function() {
		document.getElementById("PopUpWrapper").style.display="flex";
}

window.closeButton = function() {
		document.getElementById("PopUpWrapper").style.display="none";
}


var counter = 0;

window.pageBack = function() {
	counter--;
	switchPage();
}
window.pageForward = function() {
	counter++;
	switchPage();
}

window.switchPage = function() {
	var index;
	var pages = document.getElementsByClassName("pages");
	if(counter >= pages.length) {
		counter--;
	}
	else if(counter < 0) {
		counter ++;
	}
	for (index = 0; index < pages.length; index++) {
		pages[index].style.display = 'none';
	}
	pages[counter].style.display = 'block';
}

document.addEventListener('keydown', event => {
	if(event.keyCode === 37) {
		pageBack();
	}
	if(event.keyCode === 39) {
		pageForward();
	}
})

document.addEventListener('keyup', event => {
	if(document.getElementById("pageThree").style.display == "block") {
		updatePrev();
	}
})

function updatePrev() 
{
	var iFrame = document.getElementById("previewFrame");
					
	iFrame.contentWindow.document.getElementById("previewMenu").style.backgroundColor = document.getElementById("headerColor").value;
						
	var titleInput = document.getElementById("articleTitle").value;
	if(titleInput != "") {
		iFrame.contentWindow.document.getElementById("previewHeaderText").innerHTML = titleInput;
	}
	else {
		iFrame.contentWindow.document.getElementById("previewHeaderText").innerHTML = "Title";
	}
						
	iFrame.contentWindow.document.getElementById("previewHeaderText").style.color = document.getElementById("titleColor").value;
						
	iFrame.contentWindow.document.body.style.backgroundColor = document.getElementById("pageColor").value;
						
	var nameInput = document.getElementById("authorName").value;
	if(nameInput != "") {
		iFrame.contentWindow.document.getElementById("previewName").innerHTML = nameInput;
	}
	else {
		iFrame.contentWindow.document.getElementById("previewName").innerHTML = "First Last";
	}
			
	iFrame.contentWindow.document.getElementById("previewName").style.color = document.getElementById("authorColor").value;
						
	iFrame.contentWindow.document.getElementById("previewDivider").style.color = document.getElementById("dividerColor").value;
					
	var dateInput = document.getElementById("publishingDate").value;
	if(dateInput != "") {
		iFrame.contentWindow.document.getElementById("previewDate").innerHTML = dateInput;
	}
	else {
		iFrame.contentWindow.document.getElementById("previewDate").innerHTML = "Month ##, ####";
	}
						
	iFrame.contentWindow.document.getElementById("previewDate").style.color = document.getElementById("dateColor").value;
						
	var contentInput = document.getElementById("pageContent").value;
	if(contentInput != "") {
		iFrame.contentWindow.document.getElementById("previewArticleText").innerHTML = contentInput;
	}
	else {
		iFrame.contentWindow.document.getElementById("previewArticleText").innerHTML = "Text here <br><br>Text here<br><br>Text here";
	}
				
	iFrame.contentWindow.document.getElementById("previewArticleText").style.color = document.getElementById("contentColor").value;
}
