'use strict';

// Questions
const questions = [
   {
    question: "What is Time Management?",
    answers: [
      { text: "How you spend your time", correct: false },
      { text: "How to waste your time", correct: false },
      { text: "What to do with your time", correct: false },
      { text: "The process of organizing your time to increase efficency and productivity", correct: true },
    ]
  },
  {
    question: "What is the best way to start managing your time?",
    answers: [
      { text: "Ignore your tasks", correct: false },
      { text: "Plan them", correct: true },
      { text: "Procrastinate them", correct: false },
      { text: "Multitask", correct: false },
    ]
  },
  {
    question: "Which tool is can be used to schedule tasks?",
    answers: [
      { text: "using a physical calendar", correct: false },
      { text: "Using online apps such as google calander", correct: false },
      { text: "Writing them on Paper", correct: false },
      { text: "All of the above", correct: true },
    ]
  },
   {
    question: "What are some of the benefits of time management?",
    answers: [
      { text: "Make you more lazy", correct: false },
      { text: "More missed deadlines", correct: false },
      { text: "decreased stress levels", correct: true },
      { text: "There are no benefits", correct: false },
    ]
  },
   {
    question: "True or False: Time management can help improve focus",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
     
    ]
  },
   {
    question: "True or False: Time management only applies to teenagers",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
     
    ]
  },
   {
    question: "What does having bad time management mainly do?",
    answers: [
      { text: "increases productivity", correct: false },
      { text: "Decreased Stress", correct: false },
      { text: "Increased Stress", correct: true },
      { text: "None of the above", correct: false },
    ]
  },
   {
    question: "What ages does bad time management commonly affect the most?",
    answers: [
      { text: "High school students", correct: true },
      { text: "Adults", correct: false },
      { text: "University students", correct: true },
      { text: "All of the above", correct: false },
    ]
  },
   {
    question: "What percentage of students have stress from bad time management?",
    answers: [
      { text: "28%", correct: false },
      { text: "55%", correct: true },
      { text: "78%", correct: false },
      { text: "60%", correct: false },
    ]
  },
  {
    question: "Why is time management important?",
    answers: [
      { text: "It helps you hand in tasks earlier", correct: true },
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


