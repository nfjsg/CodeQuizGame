const startBtn = document.getElementById("start-btn");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit-score");
const quizTimer = document.getElementById("quiz-timer");

const questions = [
  {
    question: "What is the purpose of the querySelector method in JavaScript?",
    choices: [
      "A) To select the first element with a specific class",
      "B) To select the last element with a specific tag",
      "C) To select an element by its ID",
      "D) To select all elements in the document"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    choices: [
      "A) var myVar = 5;",
      "B) variable myVar = 5;",
      "C) myVar = 5;",
      "D) let myVar = 5;"
    ],
    correctAnswer: 3
  },
  {
    question: "What does the term 'hoisting' refer to in JavaScript?",
    choices: [
      "A) Elevating a function to a higher scope",
      "B) Moving variables to the top of their scope before execution",
      "C) Declaring a variable inside a function",
      "D) Wrapping code in a higher-order function"
    ],
    correctAnswer: 1
  },
  {
    question: "Which array method is used to add one or more elements to the end of an array and returns the new length of the array?",
    choices: [
      "A) push()",
      "B) pop()",
      "C) shift()",
      "D) unshift()"
    ],
    correctAnswer: 0
  },
  {
    question: "What is the purpose of the setTimeout function in JavaScript?",
    choices: [
      "A) To add an event listener to an element",
      "B) To stop the execution of a loop",
      "C) To delay the execution of a function",
      "D) To immediately invoke a function"
    ],
    correctAnswer: 2
  }
];


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.parentNode.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  choicesList.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(index));
    li.appendChild(button);
    choicesList.appendChild(li);
  });
}

function startTimer() {
  timeLeft = 60; // Reset timer
  quizTimer.textContent = "Time left: " + timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function checkAnswer(answerIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (answerIndex === currentQuestion.correctAnswer) {
    score++;
    displayFeedback("Correct!");
  } else {
    displayFeedback("Wrong!");
    timeLeft -= 10; // Subtract time for incorrect answer
  }

  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}

function displayFeedback(message) {
  const feedbackEl = document.getElementById("feedback");
  feedbackEl.textContent = message;
}

function endGame() {
  questionScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScore.textContent = score;
}

submitBtn.addEventListener("click", saveScore);

function saveScore() {
  const initials = initialsInput.value;
  if (initials.trim() === "") {
    return;
  }

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const newScore = { initials: initials, score: score };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.href = "highscores.html"; // Redirect to high scores page
}

// Start the quiz on button click
startBtn.addEventListener("click", startQuiz);
