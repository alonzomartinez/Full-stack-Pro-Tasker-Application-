const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a task for a project
const createTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Make sure the logged-in user owns the project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to add tasks to this project'
      });
    }

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      project: project._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Get all tasks for a project
const getTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Make sure the logged-in user owns the project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to access this project'
      });
    }

    const tasks = await Task.find({
      project: project._id
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Find the project that owns this task
    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Check that the logged-in user owns the project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to update this task'
      });
    }

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Find the project that owns this task
    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    // Check that the logged-in user owns the project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You are not allowed to delete this task'
      });
    }

    await task.deleteOne();

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};