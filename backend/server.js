require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Allows the React frontend to communicate with this backend
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Allow requests from the frontend
app.use(cors());

// Allow the server to read JSON request bodies
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({
    message: 'Full stack MERN API is running'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});