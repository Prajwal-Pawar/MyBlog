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

// delete comment
module.exports.delete = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    // check if user is authorized to delete comment
    // if user id in comment and user id in req body from decoding jwt matches then user is authorized otherwise user is not authorized
    if (comment.user != req.userId) {
      return res.status(401).json({
        message: "You are not authorize to delete the comment",
      });
    }

    // getting article id from comment to delete comment from article schema
    const articleId = comment.article;

    // delete comment from db
    await comment.deleteOne();

    // deleting comment from article schema also
    await Article.findByIdAndUpdate(articleId, {
      // to pull (delete) comment id from article comments array
      $pull: {
        comments: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Comment deleted",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
