const express = require("express");

const noteController = require("../controllers/noteController");
const authController = require("../controllers/authController");

const router = express.Router();
/*
 * App routes
 */
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

router.use(authController.protect);

router.get("/search", noteController.search);

router.get("/logout", authController.logout);

module.exports = router;
