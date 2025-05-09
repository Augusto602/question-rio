let questions = [];
let currentQuestionIndex = 0;
let score = [];
const questionContainer = document.getElementById('perguntas');
const answersContainer = document.getElementById('respostas');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  questions = shuffle(allQuestions).slice(0, 10);
  currentQuestionIndex = 0;
  score = [];
  resultContainer.style.display = "none";
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = `<span style='font-weight: bold;'>${currentQuestion.question}</span>`;
  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.classList.add('answer');
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer);
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  score.push({
    question: currentQuestion.question,
    selected: answer,
    correct: currentQuestion.correct,
    isCorrect: answer === currentQuestion.correct
  });
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {

  answersContainer.innerHTML = "";
  questionContainer.innerHTML = "";
  nextBtn.style.display = "none";
  const wrongAnswers = score.filter(q => !q.isCorrect);
  resultContainer.style.display = "block";
  resultContainer.innerHTML = `<h2>Você acertou ${score.length - wrongAnswers.length}/10</h2><br>`;
  if (wrongAnswers.length > 0) {
    resultContainer.innerHTML += "<h3>Erros:</h3><ul>";
    wrongAnswers.forEach(item => {
      resultContainer.innerHTML += `<br><li><strong>${item.question}</strong><br><span style='color:red;'>Sua resposta:</span> ${item.selected}<br><span style='color:green;'>Resposta correta:</span> ${item.correct}</li><br>`;
    });
    resultContainer.innerHTML += "</ul>";
  }
  const restartBtn = document.createElement('button');
  restartBtn.textContent = "Tentar novamente";
  restartBtn.onclick = startQuiz;
  resultContainer.appendChild(restartBtn);

}

window.onload = startQuiz;
