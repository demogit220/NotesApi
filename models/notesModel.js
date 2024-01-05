const mongoose = require("mongoose");
const userModel = require("./userModel");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  data: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A note must have a user']
  },
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
});

const notesModel = mongoose.model("Note", notesSchema);
module.exports = notesModel;
