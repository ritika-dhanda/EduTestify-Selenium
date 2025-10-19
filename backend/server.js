const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // new
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend'))); 

// Root route
app.get('/', (req, res) => {
  res.send('EduTestify Backend Running...');
});

// Serve quiz page
app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname,  '..', 'frontend', 'index.html')); // <-- quiz page
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
