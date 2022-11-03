var request = new XMLHttpRequest();
var answer = {};
var givenAnswer = {};
var response;

request.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", true);
request.send();

request.onreadystatechange = function () {
  if (this.readyState == 4) {
    response = JSON.parse(this.responseText);
    for (let obj of response) {
      createForm(obj);
      correctAnswer(obj);
    }
    submitBtn();
  }
};

function createForm(obj) {
  let value = 1;
  let formWrapper = document.querySelector(".form-container");
  let form = document.createElement("div");
  form.className = "question";
  form.addEventListener("change", takeAnswer);
  let question = document.createElement("p");
  question.innerHTML = `Q${obj.id}.${obj.question}`;
  form.appendChild(question);
  let optionArr = obj.options;

  for (let option of optionArr) {
    let optionDiv = createOption(obj.id, value, option);
    form.appendChild(optionDiv);
    ++value;
  }
  formWrapper.appendChild(form);
}

function createOption(id, value, text) {
  let div = document.createElement("div");
  let input = document.createElement("input");
  input.id = id.toString() + value.toString();
  input.type = "radio";
  input.name = id;
  input.value = value;
  div.appendChild(input);
  let label = document.createElement("label");
  label.setAttribute("for", id.toString() + value.toString());
  label.innerHTML = text;
  div.appendChild(label);
  return div;
}

function correctAnswer(obj) {
  answer[obj.id] = obj.answer;
}

function takeAnswer(e) {
  givenAnswer[e.target.name] = e.target.value;
}

function submitBtn() {
  let formWrapper = document.querySelector(".form-container");
  let btn = document.createElement("button");
  btn.innerHTML = "Submit";
  btn.id = "submit-btn";
  formWrapper.appendChild(btn);
}

var formWrapper = document.querySelector(".form-container");
formWrapper.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  resetRadio();

  var score = result();
  displayResult(score);

  var obj = {};
  givenAnswer = { ...obj };
}

function resetRadio() {
  let radioInput = document.querySelectorAll("input[type=radio]");

  for (let input of radioInput) {
    input.checked = false;
  }
}

function result() {
  let result = 0;
  for (let i = 1; i < response.length + 1; i++) {
    if (answer[i] == givenAnswer[i]) {
      ++result;
    }
  }

  return result;
}

function displayResult(score) {
  var resultDiv = document.querySelector(".score-card");
  resultDiv.innerHTML = `Score: ${score}/${response.length}`;
}
