const Project = require('../models/Project');

// Create a project
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      user: req.user.userId
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Get all projects owned by the logged-in user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.userId
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Get one project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Make sure the logged-in user owns this project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to access this project'
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Make sure the logged-in user owns this project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to update this project'
      });
    }

    project.name = req.body.name;
    project.description = req.body.description;

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Make sure the logged-in user owns this project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to delete this project'
      });
    }

    await project.deleteOne();

    res.json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
};