const catchAsync = require("../utils/catchAsync");
const Note = require("../models/notesModel");
const User = require("../models/userModel");

exports.creatNotes = catchAsync(async (req, res, next) => {
  const { title, data } = req.body;
  const newNote = await Note.create({
    title,
    data,
    owner: req.user._id,
  });

  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { notes: newNote._id } },
    { new: true } // Return the updated document
  );

  res.status(201).json({
    status: "success",
    data: {
      data: newNote,
    },
  });
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await User.findById(req.user._id).populate("notes");

  if (!notes) {
    return next(Error("No document found with this id"));
  }

  res.status(201).json({
    status: "success",
    results: notes.notes.length,
    data: {
      notes: notes.notes,
    },
  });
});

exports.getOneNote = catchAsync(async (req, res, next) => {
  const note = await Note.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

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
  // The code first deletes the note and then updates the user's notes array.
  // This ensures the note is deleted even if the user update fails.
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!note) {
    return next(Error("No document found with this id"));
  }

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { notes: note._id },
  });

  res.status(204).json({ status: "Note deleted successfully" });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const { title, data } = req.body;
  const note = await Note.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    {
      title,
      data,
      owner: req.user._id,
    },
    {
      new: true, // for showing the current update rather than previous body
      runValidators: true,
    }
  );

  if (!note) {
    return next(Error("No document found by id!"));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: note,
    },
  });
});

exports.shareNote = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const noteId = req.params.id;

  const note = await Note.findById(noteId);
  const user = await User.findById(userId);

  if (!note || !user) return next(Error("User or note not found!"));
  if (!req.user._id.equals(note.owner)) return next(Error("No document found"));

  if (note.owner.toString() === userId)
    return next(Error("Already owner of the note!!"));

  const { title, data } = note;

  const newNote = await Note.create({
    title,
    data,
    owner: userId,
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { notes: newNote._id } },
    { new: true } // Return the updated document
  );

  res.status(200).json({
    status: "success",
    data: {
      newNote,
    },
  });
});

exports.search = catchAsync(async (req, res, next) => {
  const query = req.query.q;
  // Perform a text search on the "title" and "content" fields
  // Indexer removes all the stop words, like this, is etc
  const notes = await Note.find({
    $text: { $search: query},
    owner: req.user._id,
  });

  res.status(200).json({
    status: "success",
    results: notes.length,
    data: {
      notes,
    },
  });
});
