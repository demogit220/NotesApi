const catchAsync = require("../utils/catchAsync");
const Note = require("../../models/notesModel");

exports.creatNotes = catchAsync(async (req, res, next) => {
  const note = await Note.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: note,
    },
  });
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find();

  res.status(201).json({
    status: "success",
    results: notes.length,
    data: {
      data: notes,
    },
  });
});
