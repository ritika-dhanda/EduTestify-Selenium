const express = require('express');
const fs = require('fs');
const router = express.Router();

const coursesFile = './data/courses.json';
const usersFile = './data/users.json';

// Helper functions
function getCourses() {
  const data = fs.readFileSync(coursesFile);
  return JSON.parse(data);
}
function saveCourses(courses) {
  fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
}

function getUsers() {
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 📘 Add new course (Admin functionality)
router.post('/add', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const courses = getCourses();
  const newCourse = {
    id: Date.now(),
    title,
    description,
    students: []
  };

  courses.push(newCourse);
  saveCourses(courses);

  res.status(201).json({ message: 'Course added successfully', course: newCourse });
});

// 🎓 Enroll in a course
router.post('/enroll', (req, res) => {
  const { userEmail, courseId } = req.body;
  const users = getUsers();
  const courses = getCourses();

  const user = users.find(u => u.email === userEmail);
  const course = courses.find(c => c.id === courseId);

  if (!user || !course) {
    return res.status(404).json({ message: 'User or course not found' });
  }

  // Check if already enrolled
  if (course.students.includes(user.email)) {
    return res.status(400).json({ message: 'User already enrolled' });
  }

  course.students.push(user.email);
  saveCourses(courses);

  res.status(200).json({ message: `User enrolled in ${course.title}` });
});

// 📋 Get all courses
router.get('/', (req, res) => {
  const courses = getCourses();
  res.status(200).json(courses);
});

module.exports = router;
