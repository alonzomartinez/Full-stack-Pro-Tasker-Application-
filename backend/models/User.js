const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//The User model describes what information 
// MongoDB stores for each user.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving the user
// The pre('save') hook hashes the password before it gets stored.
userSchema.pre('save', async function () {
  // Only hash the password if it has been changed
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = model('User', userSchema);