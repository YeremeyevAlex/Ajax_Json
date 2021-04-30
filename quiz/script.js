let test = document.getElementById("test");
let n = 0;
let answers = [];
let length = 0;
			
function next(text) {
	let obj = JSON.parse(text);
	let kod = "";
	length = obj.quiz.length;
				
	kod += '<h1>Тест: ' + obj.topic + '</h1>';
	kod += '<h2>Вопрос: ' + (n+1) + '</h2>';
	kod += '<h3>' + obj.quiz[n].q + '</h3>';
	kod += '<ul>';
	for(let i = 0; i < obj.quiz[n].a.length; i++){
		kod += '<li><input name="otvet" type="radio" /> ' + obj.quiz[n].a[i] + '</li>';
	}
	kod += '</ul>';
	kod += '<button onclick="check()">Далее</button>';
				
	test.innerHTML = kod;
}
			
function check(quiz) {
	let otvet = document.querySelectorAll('[name="otvet"]');
	let filled = "";
	for(let i = 0; i < otvet.length; i++) {
		if(otvet[i].checked) filled = i;
	}
	answers.push(filled);
	console.log( (n+1) + "/" + length + ":" + answers);
	if(n < length-1) {
		n++;
		loadTest(next);
	} else if(n == length-1) loadTest(result);
}
		
function result(text) {
	let obj = JSON.parse(text);
	let free = 0;
	let right = 0;
	let mistake = 0;

	for(i = 0; i < answers.length; i++) {
		if(answers[i] == "") right++;
		else if(answers[i] == obj.quiz[i].otvet) free++;
		else mistake++;
	}
	test.innerHTML = "<h1>РЕЗУЛЬТАТ</h1>";
	test.innerHTML += "<p>Правильные " + right + " </p>";
	test.innerHTML += "<p>Не правильные " + mistake + " </p>";
	test.innerHTML += "<p>Не отвечены " + free + " </p>";
}
		
function loadTest(colback) {
	let ajax = new XMLHttpRequest();
	ajax.open("GET", "quiz1.json");
	ajax.send();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			colback(this.responseText);
		}
	}; 
}