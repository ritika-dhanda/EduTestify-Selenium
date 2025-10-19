const express = require('express');
const fs = require('fs');
const router = express.Router();

const usersFile = './data/users.json';

// Utility to read users from file
function getUsers() {
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

// Utility to save users to file
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 📝 Register route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = getUsers();

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Add new user
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Registration successful', user: newUser });
});

// 🔐 Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', user });
});

module.exports = router;
