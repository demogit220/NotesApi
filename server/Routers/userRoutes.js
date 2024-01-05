const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authController = require("../controllers/authController");
/*
 * App routes
 */
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

router.use(authController.protect);

router
  .route("/notes")
  .get(noteController.getAllNotes)
  .post(noteController.creatNotes);

router
  .route("/notes/:id")
  .get(noteController.getOneNote)
  .delete(noteController.deleteOne)
  .put(noteController.updateOne);

router.post("/notes/:id/share", noteController.shareNote)

router.get("/logout", authController.logout);

module.exports = router;
