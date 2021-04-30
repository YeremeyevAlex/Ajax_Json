const content = document.getElementById("content");
			
loadFile('home.htm');
		
function openPage(text){
	content.innerHTML = text;
}
		
function loadFile(url) {
	let ajax = new XMLHttpRequest();
	ajax.open("GET", url);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			openPage(this.responseText);
		}
	};  
}