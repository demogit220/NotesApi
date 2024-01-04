const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!😌"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    // validator: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
//   passwordConfirm: {
//     type: String,
//     required: [true, 'Please confirm your password'],
//     validate: {
//       // This only works on Save or create!!!
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: 'Passwords are not the same',
//     },
//   },
});

userSchema.pre('save', async function(next) {

  // if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 11);

  // Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  hashsedPassword
) {
  return await bcrypt.compare(candidatePassword, hashsedPassword);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
