const express = require('express');
const auth = require('../utils/auth');

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const router = express.Router();

// All project routes require a valid token
router.use(auth);

// Create a project
router.post('/', createProject);

// Get all projects owned by the logged-in user
router.get('/', getProjects);

// Get one project
router.get('/:id', getProject);

// Update a project
router.put('/:id', updateProject);

// Delete a project
router.delete('/:id', deleteProject);

module.exports = router;