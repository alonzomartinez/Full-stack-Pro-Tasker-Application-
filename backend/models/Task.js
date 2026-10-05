const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },

  // Stores the project this task belongs to
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
});

module.exports = model('Task', taskSchema);