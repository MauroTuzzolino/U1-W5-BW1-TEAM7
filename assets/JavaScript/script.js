const questions = [
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
  },
];

const allAnswer = [];
for (let i = 0; i < questions.length; i++) {
  questions[i].incorrect_answers.push(questions[i].correct_answer);
  allAnswer.push(questions[i].incorrect_answers);
}
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

const testQuestionSkipper = function () {
  question.innerText = questions[i].question;
  questionCounter.innerText = `QUESTION ${i + 1} / 10`;
  containerOfQuestionAnswerContainer.innerHTML = "";
  const rAP = randomArrayPosition(allAnswer[i]);

  if (questions[i].type === "multiple") {
    let answerButton1 = document.createElement("button");
    let answerButton2 = document.createElement("button");
    let answerButton3 = document.createElement("button");
    let answerButton4 = document.createElement("button");
    let questionAnswerContainer = document.createElement("div");

    answerButton1.classList.add("benchmarkAnswerButton");
    answerButton2.classList.add("benchmarkAnswerButton");
    answerButton3.classList.add("benchmarkAnswerButton");
    answerButton4.classList.add("benchmarkAnswerButton");
    answerButton1.id = "benchmarkAnswerButton1";
    answerButton2.id = "benchmarkAnswerButton2";
    answerButton3.id = "benchmarkAnswerButton3";
    answerButton4.id = "benchmarkAnswerButton4";
    questionAnswerContainer.id = "benchmarkButtonsContainer";

    answerButton1.addEventListener("click", function () {
      answerButton1.classList.remove("clickedButton");
      answerButton2.classList.remove("clickedButton");
      answerButton3.classList.remove("clickedButton");
      answerButton4.classList.remove("clickedButton");
      answerButton1.classList.add("clickedButton");
    });
    answerButton2.addEventListener("click", function () {
      answerButton1.classList.remove("clickedButton");
      answerButton2.classList.remove("clickedButton");
      answerButton3.classList.remove("clickedButton");
      answerButton4.classList.remove("clickedButton");
      answerButton2.classList.add("clickedButton");
    });
    answerButton3.addEventListener("click", function () {
      answerButton1.classList.remove("clickedButton");
      answerButton2.classList.remove("clickedButton");
      answerButton3.classList.remove("clickedButton");
      answerButton4.classList.remove("clickedButton");
      answerButton3.classList.add("clickedButton");
    });
    answerButton4.addEventListener("click", function () {
      answerButton1.classList.remove("clickedButton");
      answerButton2.classList.remove("clickedButton");
      answerButton3.classList.remove("clickedButton");
      answerButton4.classList.remove("clickedButton");
      answerButton4.classList.add("clickedButton");
    });

    answerButton1.innerText = rAP[0];
    answerButton2.innerText = rAP[1];
    answerButton3.innerText = rAP[2];
    answerButton4.innerText = rAP[3];

    containerOfQuestionAnswerContainer.appendChild(questionAnswerContainer);
    questionAnswerContainer.appendChild(answerButton1);
    questionAnswerContainer.appendChild(answerButton2);
    questionAnswerContainer.appendChild(answerButton3);
    questionAnswerContainer.appendChild(answerButton4);
  } else {
    let answerButtonBoolean1 = document.createElement("button");
    let answerButtonBoolean2 = document.createElement("button");
    let questionAnswerContainer = document.createElement("div");

    answerButtonBoolean1.classList.add("benchmarkAnswerButton");
    answerButtonBoolean2.classList.add("benchmarkAnswerButton");
    answerButtonBoolean1.id = "benchmarkAnswerButton1";
    answerButtonBoolean2.id = "benchmarkAnswerButton2";
    questionAnswerContainer.id = "benchmarkButtonsContainer";

    answerButtonBoolean1.addEventListener("click", function () {
      answerButtonBoolean1.classList.remove("clickedButton");
      answerButtonBoolean2.classList.remove("clickedButton");
      answerButtonBoolean1.classList.add("clickedButton");
    });
    answerButtonBoolean2.addEventListener("click", function () {
      answerButtonBoolean1.classList.remove("clickedButton");
      answerButtonBoolean2.classList.remove("clickedButton");
      answerButtonBoolean2.classList.add("clickedButton");
    });

    answerButtonBoolean1.innerText = "True";
    answerButtonBoolean2.innerText = "False";
    //console.log(answerButtonBoolean1);
    //console.log(questionAnswerContainer);
    containerOfQuestionAnswerContainer.appendChild(questionAnswerContainer);
    questionAnswerContainer.appendChild(answerButtonBoolean1);
    //console.log(questionAnswerContainer);
    questionAnswerContainer.appendChild(answerButtonBoolean2);
  }
};

let correctAnswerCounter = 0;

const verifyAnswer = function () {
  let choosenAnswer = document.querySelector(".clickedButton");
  //console.log(questions[i].correct_answer);
  //console.log(choosenAnswer);
  if (choosenAnswer.innerText === questions[i].correct_answer) {
    correctAnswerCounter++;
  }
};

nextQuestionButton.addEventListener("click", function () {
  verifyAnswer();
  counter = 60;
  //console.log(correctAnswerCounter);
  i++;
  if (i === 10) {
    window.location.href = "resultsPage.html";
  }
  testQuestionSkipper();
});

window.addEventListener("DOMContentLoaded", function () {
  testQuestionSkipper();
});

const colorChanging = document.getElementById("colorChanging");
const seconds = document.getElementById("seconds");
let counter = 60;

setInterval(() => {
  counter--;
  colorChanging.setAttribute("style", `background: conic-gradient(#00ffff 0% ${100 - (counter / 60) * 100}%, white ${100 - (counter / 60) * 100}% 100%)`);
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
