// Selection of DOM elements
const startQuizBtn = document.querySelector("#startBtn");
const quizContainer = document.querySelector("#quizBox");
const timeLeftDisplay = document.querySelector("#timer");
const currentScoreDisplay = document.querySelector("#score");
const questionElement = document.querySelector("#questions");
const answerOptionsElement = document.querySelector("#answerEl");
const footerText = document.querySelector("#h2Footer");
const feedbackDisplay = document.querySelector("#aResponse");
const continueButton = document.createElement("button");
continueButton.textContent = "Next";
const retryButton = document.createElement("button");
retryButton.textContent = "Retry";

// Initial Quiz Settings
let totalTime = 60;
let currentScore = 0;
let currentQuestionIndex = 0;

const quizQuestions = [
  {
    question: "What does DOM stand for?",
    answers: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Desktop Orientation Mode"],
    correctAnswer: "Document Object Model"
  },
  {
    question: "Which of these is a JavaScript framework?",
    answers: ["React", "Laravel", "Django", "Flask"],
    correctAnswer: "React"
  },
  {
    question: "What does CSS stand for?",
    answers: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML element is used to embed JavaScript code?",
    answers: ["<script>", "<js>", "<javascript>", "<code>"],
    correctAnswer: "<script>"
  },
  {
    question: "How do you declare a JavaScript variable?",
    answers: ["var myVariable;", "variable myVariable;", "v myVariable;", "let myVariable;"],
    correctAnswer: "var myVariable;"
  }
];

// Function to start the quiz
function startQuiz() {
  footerText.style.display = "none";
  currentQuestionIndex = 0;
  currentScore = 0;
  displayQuestion();
  startTimer();
}

// Function to display the current question and answers
function displayQuestion() {
  clearQuestionAndAnswers();

  if (currentQuestionIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  questionElement.textContent = question.question;
  question.answers.forEach(answer => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.classList.add("answer-btn");
    answerButton.onclick = evaluateAnswer;
    answerOptionsElement.appendChild(answerButton);
  });
}

// Function to clear previous question and answers
function clearQuestionAndAnswers() {
  questionElement.textContent = "";
  answerOptionsElement.innerHTML = "";
}

// Function to evaluate the selected answer
function evaluateAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    currentScore++;
    feedbackDisplay.textContent = "Right!";
  } else {
    totalTime -= 10; // Deduct 10 seconds for a wrong answer
    feedbackDisplay.textContent = "Wrong!";
  }

  currentQuestionIndex++;
  displayQuestion();
}

// Function to start the timer
function startTimer() {
  const timer = setInterval(() => {
    totalTime--;
    timeLeftDisplay.textContent = `Time: ${totalTime}s`;

    if (totalTime <= 0 || currentQuestionIndex >= quizQuestions.length) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  questionElement.textContent = "Quiz Over!";
  answerOptionsElement.innerHTML = "";
  feedbackDisplay.textContent = `Your final score is ${currentScore}.`;
  retryButton.onclick = () => window.location.reload(); // Reload the page to restart the quiz
  quizContainer.appendChild(retryButton);
}

startQuizBtn.addEventListener("click", startQuiz);
