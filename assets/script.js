var mainCard = document.getElementById("main-card");
var questionCard = document.getElementById("question-card");
var gameOverCard = document.getElementById("game-over-card");
var highScoreCard = document.getElementById("high-score-card");
var startBtn = document.getElementById("start-btn");
var question = document.getElementById("question");
var firstAnswerBtn = document.getElementById("first-answer-btn");
var secondAnswerBtn = document.getElementById("second-answer-btn");
var thirdAnswerBtn = document.getElementById("third-answer-btn");
var fourthAnswerBtn = document.getElementById("fourth-answer-btn");
var timer = document.getElementById("timer");
var time = 76;
var correctAnswer = "";
var myInterval;

var masterQuestionsList = [
    { question: "What does console.log() do?", answers: [{ text: "Logs what is in the parameter to the console", correct: true}, { text: "Declares a variable", correct: false}, { text: "Styles the console to a different color", correct: false}, { text: "Executes a block of code numerous times", correct: false}]},
    { question: "What case type is most common in JavaScript?", answers: [{ text: "snake_case", correct: false}, { text: "kebab-case", correct: false}, { text: "PascalCase", correct: false}, { text: "camelCase", correct: true}]},
    { question: "What is an example of a common Javascript data type?", answers: [{ text: "Alert", correct: false}, { text: "Function", correct: false}, { text: "The DOM", correct: false}, { text: "Number", correct: true}]},
    { question: "What are some ways to Declare a JavaScript Variable", answers: [{ text: "Dec", correct: false}, { text: "Vari", correct: false}, { text: "Const", correct: true}, { text: "Iden", correct: false}]},
];

var currentQuestionsList = [];

function startQuiz() {
    mainCard.setAttribute("style", "display:none");
    questionCard.setAttribute("style","display:unset");
    currentQuestionsList = JSON.parse(JSON.stringify(masterQuestionsList));
    myInterval = setInterval(updateTimer, 1000);
    updateQnA();
}

function updateTimer() {
    if (time <= 0) {
        gameOver();
    } else {
        time--;
        timer.innerHTML = `Timer: ${time}`;
    }
}

function updateQnA() {
    var randomQuestion = currentQuestionsList.splice(Math.floor(Math.random() * currentQuestionsList.length), 1)[0];
    question.innerHTML = randomQuestion.question;
    correctAnswer = randomQuestion.answers.find(x => x.correct === true);
    firstAnswerBtn.innerHTML = randomQuestion.answers[0].text;
    secondAnswerBtn.innerHTML = randomQuestion.answers[1].text;
    thirdAnswerBtn.innerHTML = randomQuestion.answers[2].text;
    fourthAnswerBtn.innerHTML = randomQuestion.answers[3].text;
}

function gameOver() {
    questionCard.setAttribute("style", "display:none;");
    gameOverCard.setAttribute("style", "display:unset;");
}

startBtn.addEventListener("click", startQuiz);
firstAnswerBtn.addEventListener("click", updateQnA);
secondAnswerBtn.addEventListener("click", updateQnA);
thirdAnswerBtn.addEventListener("click", updateQnA);
fourthAnswerBtn.addEventListener("click", updateQnA);
