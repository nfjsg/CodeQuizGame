// highscores.js
const highScoresList = document.getElementById("high-scores-list");

function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.sort((a, b) => b.score - a.score);

  highScores.forEach(score => {
    const li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    highScoresList.appendChild(li);
  });
}

displayHighScores();
