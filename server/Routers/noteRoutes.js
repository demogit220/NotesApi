const express = require("express");

const router = express.Router();
const noteController = require("../controllers/noteController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.creatNotes);

router
  .route("/:id")
  .get(noteController.getOneNote)
  .delete(noteController.deleteOne)
  .put(noteController.updateOne);

router.post("/:id/share", noteController.shareNote);

module.exports = router;
