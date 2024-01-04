const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
/*
 * App routes
 */
router.get("/", userController.homepage);
router.post("/auth/signup", authController.signup);
// router.post('/auth/login', authController)

module.exports = router;
