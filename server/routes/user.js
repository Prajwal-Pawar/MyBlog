const express = require("express");
const router = express.Router();

// user controller
const userController = require("../controllers/user_controller");

// auth middleware to verify jwt for routes after login
const { verifyToken } = require("../middlewares/auth");

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.get("/profile/:id", verifyToken, userController.profile);

router.get("/articles", verifyToken, userController.userArticles);

module.exports = router;
