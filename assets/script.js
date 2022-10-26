var mainCard = document.getElementById("main-card");
var questionCard = document.getElementById("question-card");
var gameOverCard = document.getElementById("game-over-card");
var highScoreCard = document.getElementById("high-score-card");
var startBtn = document.getElementById("startbtn");

function startQuiz() {
    mainCard.setAttribute("style", "display:none");
    questionCard.setAttribute("style","display:unset");
}

startBtn.addEventListener("click", startQuiz);

