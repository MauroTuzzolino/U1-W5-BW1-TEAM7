const proceedForm = document.getElementById("proceedForm");
const proceedButton = document.getElementById("proceedButton");
proceedForm.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "benchmark-page.html";
});

/////////////////////// HOME JAVASCRIPT////////////////////////////////////////

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
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

const randomArray = function () {
  let randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
};
const questionCounter = document.getElementById("questionCounter");
const questionAnswerContainer = document.getElementById("questionAnswerContainer");
const question = getElementById("question");

const testQuestionSkipper = () => {
  for (let i = 0; i < questions.length; i++) {
    question.innerText = questions[i].question;
    questionCounter.innerText = `QUESTION ${i + 1} / 10`;
    if (questions.type === "multiple") {
      let answerButton1 = document.createElement("button");
      let answerButton2 = document.createElement("button");
      let answerButton3 = document.createElement("button");
      let answerButton4 = document.createElement("button");

      answerButton1.classList.add("benchmarkAnswerButton");
      answerButton2.classList.add("benchmarkAnswerButton");
      answerButton3.classList.add("benchmarkAnswerButton");
      answerButton4.classList.add("benchmarkAnswerButton");
      answerButton1.id = "benchmarkAnswerButton1";
      answerButton2.id = "benchmarkAnswerButton2";
      answerButton3.id = "benchmarkAnswerButton3";
      answerButton4.id = "benchmarkAnswerButton4";

      answerButton1.innerText = question[i].correct_answer;
      answerButton2.innerText = question[i].incorrect_answers[0];
      answerButton3.innerText = question[i].incorrect_answers[1];
      answerButton4.innerText = question[i].incorrect_answers[2];

      questionAnswerContainer.appendChild(answerButton1);
      questionAnswerContainer.appendChild(answerButton2);
      questionAnswerContainer.appendChild(answerButton3);
      questionAnswerContainer.appendChild(answerButton4);
    } else {
      let answerButton1 = document.createElement("button");
      let answerButton2 = document.createElement("button");

      answerButton1.classList.add("benchmarkAnswerButton");
      answerButton2.classList.add("benchmarkAnswerButton");
      answerButton1.id = "benchmarkAnswerButton1";
      answerButton2.id = "benchmarkAnswerButton2";

      answerButton1.innerText = question[i].correct_answer;
      answerButton2.innerText = question[i].incorrect_answers[0];

      questionAnswerContainer.appendChild(answerButton1);
      questionAnswerContainer.appendChild(answerButton2);
    }
  }
};

window.addEventListener("DOMContentLoaded", function () {
  proceedForm.removeEventListener();
  testQuestionSkipper();
});
