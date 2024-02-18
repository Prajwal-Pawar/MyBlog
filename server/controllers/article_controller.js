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
module.exports.fetchAllArticles = async (_, res) => {
  try {
    const articles = await Article.find({}).sort({
      createdAt: "desc",
    });

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

// get specific article by article id
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

// get specific article by article slug
module.exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      // populate all user information
      // .populate("user")
      // populate only users username
      .populate("user", "username")
      // populate all comment information
      .populate({
        // populating comments
        path: "comments",
        // populating user from comments
        populate: {
          path: "user",
        },
      })
      .exec();

    // increase view count when user clicks on article
    article.views++;
    await article.save();

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

// edit article
module.exports.edit = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);

    // check if user is authorized to edit article
    // if user id in article and user id in req body from decoding jwt matches then user is authorized otherwise user is not authorized
    if (article.user != req.userId) {
      return res.status(401).json({
        message: "You are not authorize to update the article",
      });
    }

    // edit article
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;
    article.user = req.userId;

    await article.save();

    return res.status(200).json({
      message: "Article updated",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating article",
    });
  }
};

// delete article
module.exports.delete = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);

    // check if user is authorized to delete article
    // if user id in article and user id in req body from decoding jwt matches then user is authorized otherwise user is not authorized
    if (article.user != req.userId) {
      return res.status(401).json({
        message: "You are not authorize to delete the article",
      });
    }

    await article.deleteOne();

    return res.status(200).json({
      message: "Article deleted",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error updating article",
    });
  }
};
