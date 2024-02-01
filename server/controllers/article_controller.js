const Article = require("../models/article");

module.exports.create = async (req, res) => {
  try {
    const article = new Article(req.body);
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
