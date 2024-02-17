const express = require("express");
const router = express.Router();

// comment controller
const commentController = require("../controllers/comment_controller");

// auth middleware to verify jwt for routes after login
const { verifyToken } = require("../middlewares/auth");

router.post("/create", verifyToken, commentController.create);

module.exports = router;
