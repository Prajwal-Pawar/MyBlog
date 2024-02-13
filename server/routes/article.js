const express = require("express");
const router = express.Router();

// article controller
const articleController = require("../controllers/article_controller");

// auth middleware to verify jwt for routes after login
const { verifyToken } = require("../middlewares/auth");

router.post("/create", verifyToken, articleController.create);

router.get("/fetch-all", verifyToken, articleController.fetchAllArticles);

router.get("/:slug", verifyToken, articleController.getArticleBySlug);

module.exports = router;
