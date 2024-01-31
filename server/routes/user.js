const express = require("express");
const router = express.Router();

// user controller
const userController = require("../controllers/user_controller");

router.post("/signup", userController.signUp);

module.exports = router;
