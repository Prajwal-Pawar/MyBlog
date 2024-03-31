const express = require("express");
const router = express.Router();

// user controller
const userController = require("../controllers/user_controller");

// auth middleware to verify jwt for routes after login
const { verifyToken } = require("../middlewares/auth");

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.get("/refetch", userController.refetch);

router.get("/logout", userController.logout);

router.get("/profile/:id", verifyToken, userController.profile);

router.get("/articles", verifyToken, userController.userArticles);

router.put("/change-password", verifyToken, userController.changePassword);

router.delete("/delete", verifyToken, userController.delete);

module.exports = router;
