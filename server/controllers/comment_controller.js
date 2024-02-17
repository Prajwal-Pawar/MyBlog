const Article = require("../models/article");
const Comment = require("../models/comment");

// create comment
module.exports.create = async (req, res) => {
  try {
    let article = await Article.findById(req.body.article);

    // if article exists
    if (article) {
      // save comment in db
      let comment = await Comment.create({
        content: req.body.content,
        user: req.userId,
        article: req.body.article,
      });

      // adding comment to article and updating article in db
      article.comments.push(comment);
      await article.save();

      // populate all user information in comments schema
      comment = await Comment.findById(comment._id)
        .populate("user", "username")
        .exec();

      return res.status(200).json({
        message: "Comment posted",
        comment,
      });
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
