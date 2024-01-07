const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    text: true,
  },
  data: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    text: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A note must have a user"],
  },
});

notesSchema.index({ title: 'text', content: {weight: 2} }, { default_language: 'en' });
const notesModel = mongoose.model("Note", notesSchema);
module.exports = notesModel;
