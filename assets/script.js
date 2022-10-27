var header = document.getElementById("header");
var viewHighScores = document.getElementById("view-high-scores")
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
var answerResponse = document.getElementById("right-or-wrong");
var submitScore = document.getElementById("submit-score");
var initials = document.getElementById("initials-input");
var backBtn = document.getElementById("go-back");
var clearBtn = document.getElementById("clear-btn");
var hsList = document.getElementById("hs-list");
var timer = document.getElementById("timer");
var score = document.getElementById("score");
var correctAnswer = "";
var myInterval;

// Contains the questions that will be copied over to the currentQuestionsList variable when a user starts their quiz.
var masterQuestionsList = [
    { question: "What does console.log() do?", answers: [{ text: "Logs what is in the () to the console", correct: true}, { text: "Declares a variable", correct: false}, { text: "Styles the console", correct: false}, { text: "Executes code numerous times", correct: false}]},
    { question: "What case type is most common in JavaScript?", answers: [{ text: "snake_case", correct: false}, { text: "kebab-case", correct: false}, { text: "PascalCase", correct: false}, { text: "camelCase", correct: true}]},
    { question: "What is an example of a common Javascript data type?", answers: [{ text: "Alert", correct: false}, { text: "Function", correct: false}, { text: "The DOM", correct: false}, { text: "Number", correct: true}]},
    { question: "What are some ways to Declare a JavaScript Variable?", answers: [{ text: "Dec", correct: false}, { text: "Vari", correct: false}, { text: "Const", correct: true}, { text: "Iden", correct: false}]},
];

// This is the current list a user is going through when testing. Once done the list has been spliced and when starting a new quiz it repopulates with the masterQuestionsList.
var currentQuestionsList = [];

function startQuiz() {
    mainCard.setAttribute("style", "display:none");
    questionCard.setAttribute("style","display:unset");
    // Populates the currentQuestionsList with the values in the masterQuestionsList.
    currentQuestionsList = JSON.parse(JSON.stringify(masterQuestionsList));  
    time = 76;
    myInterval = setInterval(updateTimer, 1000);
    updateQnA();
};

function updateTimer() {
    if (time <= 0) {
        gameOver();
    } else {
        time--;
        timer.innerHTML = `Timer: ${time}`;
    }
};

// Picks a randomQuestion from the currentQuestionsList and splices the currentQuestionsList in order to not have a repeated question. 
function updateQnA() {
    var randomQuestion = currentQuestionsList.splice(Math.floor(Math.random() * currentQuestionsList.length), 1)[0];
    question.innerHTML = randomQuestion.question;
    correctAnswer = randomQuestion.answers.find(x => x.correct === true);
    firstAnswerBtn.innerHTML = randomQuestion.answers[0].text;
    secondAnswerBtn.innerHTML = randomQuestion.answers[1].text;
    thirdAnswerBtn.innerHTML = randomQuestion.answers[2].text;
    fourthAnswerBtn.innerHTML = randomQuestion.answers[3].text;
};

// Determines whether a question is right or wrong. When a wrong answer is selected the timer goes down. 
function checkAnswer(event) {
    if (event?.srcElement?.innerHTML != correctAnswer.text) {
        //Ternary Operator
        time = time - 25 <= 0 ? 0 : time - 25; 
        timer.innerHTML = `Timer: ${time}`;
        updateTimer();
        answerResponse.innerHTML = "Wrong";
        // User is told whether they got the answer wrong or right and this allows it to go away after 2 seconds.
        setTimeout(() => { 
            answerResponse.innerHTML = ""
        }, 2000);
    } else if (event?.srcElement?.innerHTML == correctAnswer.text && correctAnswer.text) {
        answerResponse.innerHTML = "Right";
        setTimeout(() => { 
            answerResponse.innerHTML = ""
        }, 2000);
    }
    if (currentQuestionsList.length == 0) {
        gameOver();
        return;
    }
    updateQnA();
};

function gameOver() {
    initials.value = "";
    questionCard.setAttribute("style", "display:none;");
    score.innerHTML = time;
    gameOverCard.setAttribute("style", "display:unset;");
    clearInterval(myInterval);
};

// Checks the localStorage for a value. If it doesn't find anything it creates a list of objects. If it finds a score it will push that score into the list of objects.
function updateScoreList() {
    var localStorageValue = localStorage.getItem("score");
    var initialsNScore = {
        initials: initials.value,
        score: time
    };
    if (localStorageValue) {
        var parsedValue = JSON.parse(localStorageValue);
        parsedValue.push(initialsNScore);
        localStorage.setItem("score", JSON.stringify(parsedValue));
    } else {
        localStorage.setItem("score", JSON.stringify([initialsNScore]));
    }
    showHighScorePage();
};

function populateHighScoreList() {
    var localStorageValue = localStorage.getItem("score");
    var parsedValue = JSON.parse(localStorageValue);
    var orderedList = document.createElement("ol");
    //Sorts values from highest to lowest scores.
    parsedValue?.sort((a,b) =>  b.score - a.score);
    hsList.appendChild(orderedList);
    for (let x = 0; x < parsedValue?.length; x++) {
        var listItem = document.createElement("li");
        orderedList.appendChild(listItem);
        listItem.textContent = parsedValue[x].initials + " - " + parsedValue[x].score;
    }
}

function showHighScorePage() {
    removeChildren();
    populateHighScoreList();
    questionCard.setAttribute("style", "display:none;");
    gameOverCard.setAttribute("style", "display:none;");
    mainCard.setAttribute("style", "display:none;");
    header.setAttribute("style", "display:none;");
    highScoreCard.setAttribute("style", "display:unset;");
};

function showMainPage() {
    highScoreCard.setAttribute("style", "display:none;");
    header.setAttribute("style", "display:flex;");
    mainCard.setAttribute("style", "display:unset;");
    removeChildren();
};

function clearList() {
    localStorage.clear();
    removeChildren();
};

// Removes the children created for the hsList in order to avoid duplicate lists.
function removeChildren() {
    var childCount = JSON.parse(JSON.stringify(hsList.childElementCount));
    for (let x = 0; x < childCount; x++) {
        hsList.removeChild(hsList.firstChild);
    }
}

viewHighScores.addEventListener("click", showHighScorePage);
startBtn.addEventListener("click", startQuiz);
firstAnswerBtn.addEventListener("click", checkAnswer);
secondAnswerBtn.addEventListener("click", checkAnswer);
thirdAnswerBtn.addEventListener("click", checkAnswer);
fourthAnswerBtn.addEventListener("click", checkAnswer);
submitScore.addEventListener("click", updateScoreList);
backBtn.addEventListener("click", showMainPage);
clearBtn.addEventListener("click", clearList);
