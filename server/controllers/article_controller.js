const Article = require("../models/article");

// create article
module.exports.create = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      user: req.userId,
    });

    await article.save();

    return res.status(200).json({
      message: "Article published",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all articles
module.exports.fetchAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});

    return res.status(200).json({
      articles,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get specific article by Id
module.exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      // populate all user information
      // .populate("user")
      // populate only users username
      .populate("user", "username")
      .exec();

    return res.status(200).json({
      article,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
