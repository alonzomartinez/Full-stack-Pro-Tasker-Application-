const express = require('express');
const auth = require('../utils/auth');

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

// All task routes require a valid token
router.use(auth);

// Create a task for a project
router.post('/projects/:projectId/tasks', createTask);

// Get all tasks for a project
router.get('/projects/:projectId/tasks', getTasks);

// Update a task
router.put('/tasks/:taskId', updateTask);

// Delete a task
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;