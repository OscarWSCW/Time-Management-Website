'use strict';

// Questions
const questions = [
  {
    question: "What is the best way to start managing your time?",
    answers: [
      { text: "Ignore tasks", correct: false },
      { text: "Planning", correct: true },
      { text: "Procrastinate", correct: false },
      { text: "Do everything at once", correct: false },
    ]
  },
  {
    question: "Which tool is commonly used to schedule tasks?",
    answers: [
      { text: "Calendar", correct: true },
      { text: "Dice", correct: false },
      { text: "Random guess", correct: false },
      { text: "Nothing", correct: false },
    ]
  },
  {
    question: "Why is time management important?",
    answers: [
      { text: "It reduces stress", correct: true },
      { text: "It makes you procrastinate more", correct: false },
      { text: "It wastes time", correct: false },
      { text: "It makes you less productive", correct: false },
    ]
  }
  
];


const questionElement = document.getElementById("question");
const answerButtons   = document.getElementById("answer-buttons");
const nextButton      = document.getElementById("next-btn");
const debugEl         = document.getElementById("debug");


(function sanityCheck() {
  const missing = [];
  if (!questionElement) missing.push("#question");
  if (!answerButtons)   missing.push("#answer-buttons");
  if (!nextButton)      missing.push("#next-btn");
  if (missing.length) {
    const msg = `Missing element(s): ${missing.join(", ")}. `;
    console.error(msg);
    if (debugEl) debugEl.textContent = msg;
  } else {
    if (debugEl) debugEl.textContent = "";
  }
})();

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});


startQuiz();


