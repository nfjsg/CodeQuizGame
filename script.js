//const startBtn = document.getElementById("start-btn");
const startQuizButton = document.getElementById("start-btn");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit-score");

const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "High Technology Markup Language", "Home Tool Markup Language"],
    correctAnswer: 0
  },
  {
    question: "Which of the following is a JavaScript data type?",
    choices: ["String", "Float", "Boolean"],
    correctAnswer: 2
  },
  {
    question: "What is the result of 2 + 3 * 4?",
    choices: ["20", "14", "10"],
    correctAnswer: 1
  },
  // Add more questions here
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Creative Style Symbols", "Computer Style Sheets"],
    correctAnswer: 0
  }
];


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

//startBtn.addEventListener("click", startQuiz);


startQuizButton.addEventListener("click", startQuiz);

// Event listeners for answer buttons
buttonA.addEventListener("click", () => checkAnswer("a"));
buttonB.addEventListener("click", () => checkAnswer("b"));
buttonC.addEventListener("click", () => checkAnswer("c"));
buttonD.addEventListener("click", () => checkAnswer("d"));


function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    displayFeedback("Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    displayFeedback("Wrong!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

function displayFeedback(message) {
  const feedbackEl = document.getElementById("feedback");
  feedbackEl.textContent = message;
}


function startQuiz() {
  startBtn.parentNode.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  displayQuestion();
  startTimer();
}

// ... (Previous code)

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
  const timerInterval = setInterval(() => {
    timeLeft--;
    // Update the timer display
    quizTimer.textContent = "Time left: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function generateQuizQuestion() {
  const feedbackEl = document.getElementById("feedback");
  feedbackEl.textContent = ""; // Clear feedback message

  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

// ... (Other functions)

// Start the quiz on button click


function endGame() {
  questionScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScore.textContent = score;
}

submitBtn.addEventListener("click", saveScore);

// ... (Previous code)

function saveScore() {
  const initials = initialsInput.value;
  if (initials.trim() === "") {
    return; // Don't save if initials are empty
  }

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const newScore = { initials: initials, score: score };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Redirect or display high scores page
  window.location.href = "highscores.html";
}

// ...

// ...
