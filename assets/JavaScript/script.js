/*
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },*/
let questions;
const fetchQ = async () => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${takeOut}&category=18&difficulty=${takeOut2}`);
    //console.log(response);
    const data = await response.json();
    questionsFullFill(data.results);
    console.log(data.results);
  } catch (error) {
    console.log(error);
  }
};

const questionsFullFill = function (data) {
  questions = data;
  console.log(questions);
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
let i = 0;

const clicked = function () {
  const selected = document.querySelector(".clickedButton");
  if (selected) {
    selected.classList.remove("clickedButton");
  }
};

const testQuestionSkipper = function () {
  question.innerText = questions[i].question;
  questionCounter.innerText = `QUESTION ${i + 1} / 10`;
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

const verifyAnswer = function () {
  let choosenAnswer = document.querySelector(".clickedButton");
  //console.log(questions[i].correct_answer);
  //console.log(choosenAnswer);
  if (!choosenAnswer) {
    return;
  } else {
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

nextQuestionButton.addEventListener("click", function () {
  //console.log("ciaooooo");
  verifyAnswer();
  redOrGreen();
  counter = 60;
  //console.log(correctAnswerCounter);
  i++;
  if (i === 10) {
    window.location.href = "resultsPage.html";
  }
  setTimeout(() => {
    testQuestionSkipper();
  }, 500);
});

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
      if (i === 10) {
        window.location.href = "resultsPage.html";
      }
      testQuestionSkipper();
      counter = 60;
    }
  }, 1000);
};

window.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
  //timerFunction();
  //testQuestionSkipper();
});

//let gennaro = 3;
