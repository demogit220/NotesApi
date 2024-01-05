const catchAsync = require("../utils/catchAsync");
const Note = require("../../models/notesModel");

exports.creatNotes = catchAsync(async (req, res, next) => {
  const newNote = await Note.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newNote,
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

exports.getOneNote = catchAsync(async (req, res, next) => {
  // console.log(req.param.id);
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(Error("No document found with this id"));
  }

  res.status(200).json({
    status: "success",
    data: {
      note,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Note.findByIdAndDelete(req.params.id);

  if (!doc) return next(Error("No document found by id!"));

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // for showing the current update rather than previous body
    runValidators: true,
  });

  if (!doc) {
    return next(Error("No document found by id!"));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
