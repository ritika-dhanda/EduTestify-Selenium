const express = require('express');
const fs = require('fs');
const router = express.Router();

const quizzesFile = './data/quizzes.json';
const resultsFile = './data/results.json';

// Helper functions
function getQuizzes() {
  const data = fs.readFileSync(quizzesFile);
  return JSON.parse(data);
}
function saveQuizzes(quizzes) {
  fs.writeFileSync(quizzesFile, JSON.stringify(quizzes, null, 2));
}

function getResults() {
  const data = fs.readFileSync(resultsFile);
  return JSON.parse(data);
}
function saveResults(results) {
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
}

// 📋 Add quiz for a course
router.post('/add', (req, res) => {
  const { courseId, questions } = req.body;
  if (!courseId || !questions || !questions.length) {
    return res.status(400).json({ message: 'CourseId and questions required' });
  }

  const quizzes = getQuizzes();
  quizzes.push({ courseId, questions });
  saveQuizzes(quizzes);

  res.status(201).json({ message: 'Quiz added successfully', courseId });
});

// 📝 Get quiz for a course
router.get('/:courseId', (req, res) => {
  const { courseId } = req.params;
  const quizzes = getQuizzes();

  const quiz = quizzes.find(q => q.courseId == courseId);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  res.status(200).json(quiz);
});

// ✅ Submit quiz answers and track progress
router.post('/submit', (req, res) => {
  const { courseId, userEmail, answers } = req.body;
  if (!courseId || !userEmail || !answers) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const quizzes = getQuizzes();
  const quiz = quizzes.find(q => q.courseId == courseId);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  // Calculate score
  let score = 0;
  quiz.questions.forEach(q => {
    if (answers[q.id] && answers[q.id] === q.answer) {
      score += 1;
    }
  });

  // Save result to results.json
  const results = getResults();
  results.push({ userEmail, courseId, score, total: quiz.questions.length, date: new Date() });
  saveResults(results);

  res.status(200).json({ message: 'Quiz submitted', score, total: quiz.questions.length });
});

module.exports = router;
