const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

const courseId = 1760787501707; // Example courseId
const userEmail = "ritika@example.com"; // Example user email

// 1️⃣ Fetch quiz questions from backend
fetch(`http://localhost:5000/api/quizzes/${courseId}`)
  .then(res => res.json())
  .then(data => displayQuiz(data.questions))
  .catch(err => console.error(err));

// 2️⃣ Display quiz questions dynamically
function displayQuiz(questions) {
  questions.forEach(q => {
    const div = document.createElement('div');
    div.classList.add('question-block');
    div.innerHTML = `
      <p>${q.question}</p>
      ${q.options.map(opt => `<label><input type="radio" name="q${q.id}" value="${opt}"> ${opt}</label>`).join('<br>')}
      <hr>
    `;
    quizContainer.appendChild(div);
  });
}

// 3️⃣ Handle quiz submission
submitBtn.addEventListener('click', () => {
  const answers = {};
  const inputs = document.querySelectorAll('input[type=radio]:checked');

  inputs.forEach(input => {
    const name = input.name.replace('q', '');
    answers[name] = input.value;
  });

  // Optional QA validation: Check if all questions answered
  if (Object.keys(answers).length === 0) {
    alert("Please select at least one answer before submitting.");
    return;
  }

  // 4️⃣ Send answers to backend
  fetch('http://localhost:5000/api/quizzes/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, userEmail, answers })
  })
    .then(res => res.json())
    .then(data => {
      resultDiv.innerHTML = `<h3>Score: ${data.score} / ${data.total}</h3>`;
    })
    .catch(err => console.error(err));
});
