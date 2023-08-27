const startBtn = document.getElementById("start-btn");
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

startBtn.addEventListener("click", startQuiz);

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
    if (timeLeft <= 75) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }
  
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}

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
}

// ...

// ...
