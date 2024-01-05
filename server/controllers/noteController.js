const catchAsync = require("../utils/catchAsync");
const Note = require("../../models/notesModel");

exports.creatNotes = catchAsync(async (req, res, next) => {
  const { title, data } = req.body;
  const newNote = await Note.create({
    title,
    data,
    owner: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      data: newNote,
    },
  });
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const notes = await Note.find({ owner: req.user._id });

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
    // ankit not working
    return next(Error("No document found with this id"));
  }
  // console.log(typeof note.owner)
  if(!req.user._id.equals(note.owner)) return next(Error("No document found with this id"));

  res.status(200).json({
    status: "success",
    data: {
      note,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id); // ankit
  if (!req.user._id.equals(note.owner))
    return next(Error("No document found by id"));
  const doc = await Note.findByIdAndDelete(req.params.id);

  if (!doc) return next(Error("No document found by id!"));

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id); // ankit
  if (!req.user._id.equals(note.owner))
    return next(Error("No document found by id"));

  const { title, data } = req.body;
  const doc = await Note.findByIdAndUpdate(
    req.params.id,
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

// not working properly
exports.shareNote = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  const doc = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // for showing the current update rather than previous body
    runValidators: true,
  });
  const note = await Note.findById(req.params.id);
  note.sharedWith.push(userId);

  res.status(200).json({
    status: "success",
    data: {
      note,
    },
  });
});
