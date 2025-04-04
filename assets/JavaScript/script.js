const easyInput = document.getElementById("easyDiff");
const mediumInput = document.getElementById("mediumDiff");
const hardInput = document.getElementById("hardDiff");

const easyLabel = document.getElementById("labelEasy");
const mediumLabel = document.getElementById("labelMedium");
const hardLabel = document.getElementById("labelHard");

easyInput.addEventListener("click", function () {
  mediumLabel.classList.remove("labelMedium");
  hardLabel.classList.remove("labelHard");
  easyLabel.classList.add("labelEasy");
});

mediumInput.addEventListener("click", function () {
  easyLabel.classList.remove("labelEasy");
  hardLabel.classList.remove("labelHard");
  mediumLabel.classList.add("labelMedium");
});

hardInput.addEventListener("click", function () {
  mediumLabel.classList.remove("labelMedium");
  easyLabel.classList.remove("labelEasy");
  hardLabel.classList.add("labelHard");
});

let questions;
const fetchQ = async () => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${takeOut}&category=18&difficulty=${takeOut2}`);
    //console.log(response);
    const data = await response.json();

    questionsFullFill(data.results);
    //console.log(data.results);
  } catch (error) {
    console.log(error);
  }
};

const questionsFullFill = function (data) {
  questions = data;
  //console.log(questions);

  let arrayToString = JSON.stringify(questions);
  localStorage.setItem("arrayToString", arrayToString);
  //console.log(arrayToString);
  const time = document.getElementById("benchmarkTimer");
  time.style.display = "block";
  const footer = document.getElementsByTagName("footer")[0];
  footer.style.display = "block";

  cycleFunction();
  testQuestionSkipper();
  timerFunction();
};

const cycleFunction = function () {
  //console.log(questions);
  for (let i = 0; i < questions.length; i++) {
    questions[i].incorrect_answers.push(questions[i].correct_answer);
    allAnswer.push(questions[i].incorrect_answers);
  }
};

let takeOut; //numero domande
let takeOut2; //difficoltà
const section = document.getElementById("formContainer");
const form = document.getElementById("formid");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let numbOfQuestions = document.getElementById("numbOfQuestions");
  takeOut = numbOfQuestions.value;
  let radioChoice = document.querySelector('input[name="difficulty"]:checked')?.value;
  takeOut2 = radioChoice;
  //console.log(takeOut2);
  //cambia con la nostra
  localStorage.setItem("sharedData2", takeOut);
  fetchQ();

  //console.log(questions);
});

//console.log(questions);
const allAnswer = [];

//console.log(allAnswer);

const randomArrayPosition = function (arry) {
  const newArry = [];
  const numArry = [];
  for (let i = 0; i < arry.length; i++) {
    numArry.push(i);
  }
  for (let i = 0; i < arry.length; i++) {
    let randNum = Math.floor(Math.random() * numArry.length);
    let num = numArry[randNum];
    newArry.push(arry[num]);
    numArry.splice(randNum, 1);
  }
  return newArry;
};

const questionCounter = document.getElementById("questionCounter");
const containerOfQuestionAnswerContainer = document.getElementById("containerOfBenchmarkButtonsContainer");
const question = document.getElementById("questionH1");
const nextQuestionButton = document.getElementById("nextQuestionButton");
// function sticazzi() {
//   console.log("ciao");
// }
let i = 0;

const clicked = function () {
  const selected = document.querySelector(".clickedButton");
  if (selected) {
    selected.classList.remove("clickedButton");
  }
};

const testQuestionSkipper = function () {
  nextQuestionButton.addEventListener("click", skipQuestion);

  question.innerText = questions[i].question;
  questionCounter.innerText = `QUESTION ${i + 1} / ${questions.length}`;
  containerOfQuestionAnswerContainer.innerHTML = "";
  const rAP = randomArrayPosition(allAnswer[i]);
  const questionAnswerContainer = document.createElement("div");
  questionAnswerContainer.id = "benchmarkButtonsContainer";
  containerOfQuestionAnswerContainer.appendChild(questionAnswerContainer);
  if (rAP.length == 2) {
    rAP.pop();
    rAP.pop();
    rAP.push("True");
    rAP.push("False");
  }
  for (let j = 0; j < rAP.length; j++) {
    const answerButton = document.createElement("button");
    answerButton.classList.add("benchmarkAnswerButton");
    questionAnswerContainer.appendChild(answerButton);

    answerButton.addEventListener("click", function () {
      clicked();
      answerButton.classList.add("clickedButton");
    });
    answerButton.innerText = rAP[j];
  }
};

let correctAnswerCounter = 0;
const userQ = [];
const verifyAnswer = function () {
  nextQuestionButton.removeEventListener("click", skipQuestion);

  let choosenAnswer = document.querySelector(".clickedButton");
  //console.log(questions[i].correct_answer);
  //console.log(choosenAnswer);
  if (!choosenAnswer) {
    userQ.push("NOT ASWERED");
    return;
  } else {
    userQ.push(choosenAnswer.innerText);

    if (choosenAnswer.innerText === questions[i].correct_answer) {
      correctAnswerCounter++;
      localStorage.setItem("sharedData", correctAnswerCounter);
    }
  }
};

const redOrGreen = function () {
  let choosenAnswer = document.querySelector(".clickedButton");
  if (!choosenAnswer) {
    return;
  }
  if (choosenAnswer.innerText === questions[i].correct_answer) {
    choosenAnswer.classList.add("correctAnswer");
  } else {
    choosenAnswer.classList.add("wrongAnswer");
  }
};

let userQToString;

const skipQuestion = function () {
  console.log("ciaooooo");
  verifyAnswer();
  redOrGreen();
  counter = 60;
  //console.log(correctAnswerCounter);
  i++;
  skipPage();
  setTimeout(() => {
    testQuestionSkipper();
  }, 500);
};

nextQuestionButton.addEventListener("click", skipQuestion);

const colorChanging = document.getElementById("colorChanging");
const seconds = document.getElementById("seconds");
let counter = 60;

const timerFunction = function () {
  setInterval(() => {
    counter--;
    colorChanging.style.background = `conic-gradient(#9A6A9E 0% ${100 - (counter / 60) * 100}%, #00ffff  ${100 - (counter / 60) * 100}% 100%)`;
    //console.log(counter);
    seconds.innerText = counter;
    if (counter === 0) {
      i++;
      userQ.push("NOT ASWERED");
      skipPage();
      testQuestionSkipper();
      counter = 60;
    }
  }, 1000);
};

const skipPage = function () {
  if (i === questions.length) {
    const userQToString = JSON.stringify(userQ);
    localStorage.setItem("userAnswer", userQToString);
    //console.log(userQToString);
    window.location.href = "resultsPage.html";
  }
};

window.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
  //timerFunction();
  //testQuestionSkipper();
});

//let gennaro = 3;
