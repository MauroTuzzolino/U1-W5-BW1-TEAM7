console.log(window);

function decodeStrangeCodes(str) {
  const entities = {
    quot: '"',
    amp: "&",
    lt: "<",
    gt: ">",
    apos: "'",
    nbsp: "\u00A0",
    copy: "©",
    reg: "®",
    euro: "€",
    hellip: "…",
    trade: "™",
  };

  return str
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(d))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&([a-zA-Z]+);/g, (_, name) => entities[name] || `&${name};`);
}

//PAGINA WELCOME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const welcomePageFunction = function () {
  const promiseCheck = document.getElementById("promiseCheck");
  const proceedButton = document.getElementById("proceedButton");
  const proceedForm = document.getElementById("proceedForm");

  proceedForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "benchmark-page.html";
    promiseCheck.checked = false;
  });

  proceedButton.disabled = true;
  promiseCheck.addEventListener("change", () => {
    proceedButton.disabled = !promiseCheck.checked;
  });
};

//PAGINA bBENCHMARK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const benchmarkFunction = function () {
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
    question.innerText = decodeStrangeCodes(questions[i].question);
    questionCounter.innerText = `QUESTION ${i + 1} / ${questions.length}`;
    containerOfQuestionAnswerContainer.innerHTML = "";
    const rAP = randomArrayPosition(allAnswer[i]);
    const questionAnswerContainer = document.createElement("div");
    questionAnswerContainer.id = "benchmarkButtonsContainer";
    containerOfQuestionAnswerContainer.appendChild(questionAnswerContainer);
    if (rAP.length == 2) {
      rAP.splice(0, rAP.length, "True", "False");
    }
    for (let j = 0; j < rAP.length; j++) {
      const answerButton = document.createElement("button");
      answerButton.classList.add("benchmarkAnswerButton");
      questionAnswerContainer.appendChild(answerButton);

      answerButton.addEventListener("click", function () {
        clicked();
        answerButton.classList.add("clickedButton");
      });
      answerButton.innerText = decodeStrangeCodes(rAP[j]);
    }
    nextQuestionButton.addEventListener("click", skipQuestion);
  };

  let correctAnswerCounter = 0;
  const userQ = [];
  const verifyAnswer = function () {
    nextQuestionButton.removeEventListener("click", skipQuestion);

    const choosenAnswer = document.querySelector(".clickedButton");
    //console.log(questions[i].correct_answer);
    //console.log(choosenAnswer);
    if (!choosenAnswer) {
      userQ.push("NOT ASWERED");
      return;
    } else {
      userQ.push(choosenAnswer.innerText);

      if (choosenAnswer.innerText === decodeStrangeCodes(questions[i].correct_answer)) {
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

  const skipQuestion = function () {
    nextQuestionButton.classList.add("nextClicked");
    // console.log("ciaooooo");
    verifyAnswer();
    redOrGreen();
    counter = 60;
    //console.log(correctAnswerCounter);
    i++;
    skipPage();
    setTimeout(() => {
      nextQuestionButton.classList.remove("nextClicked");
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
};

//PAGINA RISULTATI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const resultPageFunction = function () {
  let recivedData = localStorage.getItem("sharedData");
  let recivedData2 = localStorage.getItem("sharedData2");
  let arrayToString = localStorage.getItem("arrayToString");
  let stringToArray = JSON.parse(arrayToString);
  //console.log(stringToArray);
  //console.log(recivedData);
  let userAnswer = localStorage.getItem("userAnswer");
  let answerToArray = JSON.parse(userAnswer);
  //console.log(answerToArray);

  if (!recivedData2) {
    window.location.href = "./welcomePage.html";
  }
  if (!recivedData) {
    recivedData = 0;
  }

  const correctPercentage = document.getElementById("correct-percentage");
  correctPercentage.innerText = `${((recivedData / recivedData2) * 100).toFixed(2)}%`;

  const correctQuestions = document.getElementById("correct-questions");
  correctQuestions.innerText = `${recivedData}/${recivedData2} questions`;

  const wrongPercentage = document.getElementById("wrong-percentage");
  wrongPercentage.innerText = `${(((recivedData2 - recivedData) / recivedData2) * 100).toFixed(2)}%`;

  const wrongQuestions = document.getElementById("wrong-questions");
  wrongQuestions.innerText = `${recivedData2 - recivedData}/${recivedData2} questions`;

  const donutResults = function () {
    const donut = document.getElementById("donut");
    donut.style.background = `conic-gradient(#d20094 0% ${((recivedData2 - recivedData) / recivedData2) * 100}%, #00ffff ${
      ((recivedData2 - recivedData) / recivedData2) * 100
    }% 100%)`;

    if (recivedData2 - recivedData > recivedData) {
      const donutTitle = document.getElementById("donut-title");
      donutTitle.innerText = "You failed!";

      const donutResult = document.getElementById("donut-result");
      donutResult.innerText = "You haven't passed the exam.";

      const donutPara = document.getElementById("donut-para");
      donutPara.innerText = "You failed so you won't receive our certificate. Check your e-mail for promotions and spams.";
    }
  };

  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "./feedback.html";
  });

  const tableContainer = document.getElementById("containerOfTable");

  const correctIncorrect = function (td2, td3) {
    if (td2.innerText === td3.innerText) {
      td2.classList.add("itsCorrect");
    } else {
      td2.classList.add("itsIncorrect");
    }
  };

  const tableFunction = function () {
    const table = document.createElement("table");
    table.classList.add("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const col1 = document.createElement("th");
    col1.textContent = "Question";
    headerRow.appendChild(col1);

    const col2 = document.createElement("th");
    col2.textContent = "User Answer";
    headerRow.appendChild(col2);

    const col3 = document.createElement("th");
    col3.textContent = "Corrects Answer";
    headerRow.appendChild(col3);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < stringToArray.length; i++) {
      const tr = document.createElement("tr");

      // Colonna 1
      const td1 = document.createElement("td");
      td1.textContent = decodeStrangeCodes(stringToArray[i].question);
      tr.appendChild(td1);

      // Colonna 2
      const td2 = document.createElement("td");
      td2.textContent = answerToArray[i];
      tr.appendChild(td2);

      // Colonna 3
      const td3 = document.createElement("td");
      td3.textContent = decodeStrangeCodes(stringToArray[i].correct_answer);
      tr.appendChild(td3);

      tbody.appendChild(tr);

      table.appendChild(tbody);

      correctIncorrect(td2, td3);

      tableContainer.appendChild(table);
    }
  };

  window.addEventListener("DOMContentLoaded", function () {
    donutResults();
    tableFunction();
  });
};

// PAGINA FEEDBACK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const feedbackPageFunction = function () {
  const stars = document.querySelectorAll("#star-rating span");
  let currentRating = 0;

  function updateRating(rating) {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      if (parseInt(star.getAttribute("data-value")) <= rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    }
  }

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    star.addEventListener("mouseover", function () {
      const rating = parseInt(star.getAttribute("data-value"));
      updateRating(rating);
      star.classList.add("hover");
    });

    star.addEventListener("mouseout", function () {
      updateRating(currentRating);
      for (let j = 0; j < stars.length; j++) {
        stars[j].classList.remove("hover");
      }
    });

    star.addEventListener("click", function () {
      currentRating = parseInt(star.getAttribute("data-value"));
      updateRating(currentRating);
    });
  }

  const starForm = document.getElementById("star-form");
  const feedbackContainer = document.querySelector("main");
  const resultMessage = document.getElementById("result-message");
  const resultText = document.getElementById("result-text");
  const paraText = document.getElementById("para-text");
  const mageImg = document.createElement("img");

  starForm.addEventListener("submit", function (e) {
    e.preventDefault();

    feedbackContainer.style.display = "none";

    if (currentRating <= 3) {
      resultText.innerText = "Thank you for participating";
      paraText.innerText = "Sorry you didn't like it.\nWe will do our best to improve the test, following your suggestions.";
      mageImg.src = "./assets/img/coldFace.png";
      resultMessage.append(mageImg);
    } else if (currentRating <= 7) {
      resultText.innerText = "Thank you for participating.";
      paraText.innerText = "We will do our best to improve the test,\nfollowing your suggestions.";
      mageImg.src = "./assets/img/o7Img.png";
      resultMessage.append(mageImg);
    } else {
      resultText.innerText = "Thank you for participating.";
      paraText.innerText = "We are happy that you enjoyed our test.\nWe will continue to improve it to make it even better!";
      mageImg.src = "./assets/img/magePng.png";
      resultMessage.append(mageImg);
    }

    resultMessage.style.display = "block";
  });
};

switch (window.location.pathname) {
  case "/welcomePage.html":
    welcomePageFunction();
    break;
  case "/benchmark-page.html":
    benchmarkFunction();
    break;
  case "/resultsPage.html":
    resultPageFunction();
    break;
  case "/feedback.html":
    feedbackPageFunction();
    break;

  default:
    console.log("404 page not found, sorry &#128532");
    break;
}
