const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  note: {
    required: [true, "A note must have description"],
    trim: true, // it removes the white spaces from begining and end
  },
});

const notesModel = mongoose.model("Notes", notesSchema);
module.exports = notesModel;
