const quizData = [
    {
      id: 1,
      section: "General Knowledge",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Rome"],
          correct: "Paris",
          status: null,
          selected: null,
          tempSelected: null
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          correct: "Mars",
          status: null,
          selected: null,
          tempSelected: null
        },
        {
          question: "How many continents are there?",
          options: ["5", "6", "7", "8"],
          correct: "7",
          status: null,
          selected: null,
          tempSelected: null
        }
      ]
    },
    {
      id: 2,
      section: "Math",
      questions: [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct: "4",
          status: null,
          selected: null,
          tempSelected: null
        },
        {
          question: "What is 5 × 3?",
          options: ["15", "20", "10", "8"],
          correct: "15",
          status: null,
          selected: null,
          tempSelected: null
        },
        {
          question: "What is √16?",
          options: ["2", "4", "6", "8"],
          correct: "4",
          status: null,
          selected: null,
          tempSelected: null
        }
      ]
    },
    {
      id: 3,
      section: "Science",
      questions: [
        {
          question: "What gas do plants absorb from the atmosphere?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
          correct: "Carbon Dioxide",
          status: null,
          selected: null,
          tempSelected: null
        },
        {
          question: "What part of the plant conducts photosynthesis?",
          options: ["Root", "Stem", "Leaf", "Flower"],
          correct: "Leaf",
          status: null,
          selected: null,
          tempSelected: null
        },
        {
          question: "Which organ is responsible for pumping blood?",
          options: ["Lungs", "Brain", "Heart", "Liver"],
          correct: "Heart",
          status: null,
          selected: null,
          tempSelected: null
        }
      ]
    }
];

let currentSectionIndex = 0;
let currentQuestionIndex = 0;

function createTimer() {
  let Timer = 30;
  const timeInterval = setInterval(() => {
    Timer--;
    const minutes = Math.floor(Timer / 60);
    const seconds = Timer % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.querySelector("#que-timer").textContent = `Time Left: ${formattedTime}`;

    if (Timer <= 0) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function renderSections() {
  const topicContainer = document.querySelector(".left-quiz-div-top");
  topicContainer.innerHTML = "<h1>Sections</h1>";
  quizData.forEach((data, index) => {
    topicContainer.innerHTML += `<div class="Quiz-Topic"><p id="${index}">${data.section}</p></div>`;
  });
  topicContainer.addEventListener("click", handleSectionClick);
}

function handleSectionClick(e) {
  if (!e.target.id) return;
  currentSectionIndex = parseInt(e.target.id);
  currentQuestionIndex = 0;
  quizData[currentSectionIndex].questions.forEach(q => q.tempSelected = null);
  renderRightSectionTitle();
  renderQuestionNumbers();
  renderCurrentQuestion();
}

function renderRightSectionTitle() {
  const rightDiv = document.querySelector(".right-quiz-div h1");
  rightDiv.innerHTML = `<h4>${quizData[currentSectionIndex].section}</h4>`;
}

function renderQuestionNumbers() {
  const container = document.getElementById("all-questions-number");
  container.innerHTML = "";
  const questions = quizData[currentSectionIndex].questions;
  questions.forEach((q, index) => {
    const qElement = document.createElement("div");
    qElement.classList.add("q");
    qElement.textContent = index + 1;
    if (q.status === "review") {
      qElement.style.backgroundColor = "blue";
    } else if (q.status === "answered") {
      qElement.style.backgroundColor = "lightgreen";
    } else {
      qElement.style.backgroundColor = "red";
    }
    qElement.addEventListener("click", () => {
      currentQuestionIndex = index;
      renderCurrentQuestion();
    });
    container.appendChild(qElement);
  });
}

function renderCurrentQuestion() {
  const questionData = document.querySelector(".question-data");
  const currentQuestion = quizData[currentSectionIndex].questions[currentQuestionIndex];
  questionData.innerHTML = `<h1>${currentQuestionIndex + 1}. ${currentQuestion.question}</h1>`;
  currentQuestion.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    if (currentQuestion.tempSelected === opt) {
      btn.style.backgroundColor = "lightblue";
    }
    if (currentQuestion.selected === opt) {
      btn.style.backgroundColor = "lightgreen";
    }
    questionData.appendChild(btn);
  });
}

function markForReview() {
  quizData[currentSectionIndex].questions[currentQuestionIndex].status = "review";
  renderQuestionNumbers();

  const isLastSection = currentSectionIndex === quizData.length - 1;
  const isLastQuestion = currentQuestionIndex === quizData[currentSectionIndex].questions.length - 1;

  if (!(isLastSection && isLastQuestion)) {
    goToNextQuestion();
  }
}

function handleSaveNext() {
  const currentQuestion = quizData[currentSectionIndex].questions[currentQuestionIndex];
  if (!currentQuestion.tempSelected) {
    alert("Please select an option before proceeding!");
    return;
  }
  currentQuestion.selected = currentQuestion.tempSelected;
  currentQuestion.status = "answered";
  renderQuestionNumbers();
  goToNextQuestion();
}

function goToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[currentSectionIndex].questions.length) {
    renderCurrentQuestion();
  } else {
    currentSectionIndex++;
    currentQuestionIndex = 0;
    if (currentSectionIndex < quizData.length) {
      renderRightSectionTitle();
      renderQuestionNumbers();
      renderCurrentQuestion();
    } else {
      endQuiz();
    }
  }
}

function markQuestion(index, color) {
  const question = quizData[currentSectionIndex].questions[index];
  if (color === "blue") {
    question.status = "review";
  } else if (color === "lightgreen") {
    question.status = "answered";
  }
  renderQuestionNumbers();
}

function QUIZstarted() {
  const startQuizBtn = document.querySelector("#Start-Quiz");
  startQuizBtn.addEventListener("click", () => {
    const nameInput = document.querySelector("#firstName");
    if (nameInput.value.trim() === "") {
      alert("First Name should not be empty!");
      return;
    }

    document.querySelector(".container").style.display = "none";
    document.querySelector(".quiz-screen").style.display = "block";
    document.querySelector("#myName").textContent = `Name: ${nameInput.value}`;

    createTimer();
    renderSections();
    renderRightSectionTitle();
    renderQuestionNumbers();
    renderCurrentQuestion();

    document.querySelector(".question-data").addEventListener("click", (e) => {
      if (e.target.classList.contains("option-btn")) {
        const allOptions = document.querySelectorAll(".option-btn");
        allOptions.forEach(btn => btn.style.backgroundColor = "");
        e.target.style.backgroundColor = "lightblue";
        const selectedOption = e.target.textContent;
        const currentQuestion = quizData[currentSectionIndex].questions[currentQuestionIndex];
        currentQuestion.tempSelected = selectedOption;
      }
    });

    document.querySelector("#save-next").addEventListener("click", handleSaveNext);
    document.querySelector("#mark-review").addEventListener("click", markForReview);
  });
}

function endQuiz() {
  let totalCorrect = 0;
  quizData.forEach(section => {
    section.questions.forEach(q => {
      if (q.selected === q.correct) totalCorrect++;
    });
  });
  const totalQuestions = quizData.reduce((sum, section) => sum + section.questions.length, 0);
  document.getElementById("final-score").textContent = `Your Score: ${totalCorrect} / ${totalQuestions}`;
  document.querySelector(".quiz-screen").style.display = "none";
  document.querySelector(".end-screen").style.display = "block";
}

document.getElementById("restart-quiz").addEventListener("click", () => {
  location.reload();
});
console.log("game started");
QUIZstarted();
