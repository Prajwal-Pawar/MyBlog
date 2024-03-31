const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Article = require("../models/article");
const Comment = require("../models/comment");

const JWT_SECRET_KEY = "5uYwxKODsw34UtYagIZNGDo2GqnPY0tC";

// register
module.exports.signUp = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });

    // if user exists
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password before saving it in DB
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // save user in DB
    user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// login
module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // if user doesn't exists
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }

    // checking if inputted password and password in db matches
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // generating jwt token to authorize user after login
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    /* destructure all userinfo and password separately to send user info
    to client without password */
    const { password, ...userInfo } = user._doc;

    // generate httpOnly, secure and sameSite cookie and response
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: userInfo,
      });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// re-fetch user
module.exports.refetch = async (req, res) => {
  try {
    // get token from cookies
    const token = req.cookies.token;

    // verify jwt token
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    return res.status(200).json({
      decodedToken,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// logout
module.exports.logout = async (req, res) => {
  try {
    // clear cookie
    return res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "User logged out",
      });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// profile
module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    // if user doesn't exists
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get user articles
module.exports.userArticles = async (req, res) => {
  try {
    // find article by current user which is in req body
    let articles = await Article.find({ user: req.userId });

    return res.status(200).json({
      articles,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error fetching articles",
    });
  }
};

// change user password
module.exports.changePassword = async (req, res) => {
  try {
    // find user by user id which is in req body
    let user = await User.findById(req.userId);

    // if user inputted password and user current password in db doesnt match
    if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
      return res.status(400).json({
        message: "Please enter correct old password",
      });
    }

    // hash new password before changing it in DB
    const hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 10);

    // change user password
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Error changing password",
    });
  }
};

// delete user
module.exports.delete = async (req, res) => {
  try {
    // find user by user id which is in req body
    await User.findByIdAndDelete(req.userId);

    // deleting articles that user published
    await Article.deleteMany({ user: req.userId });

    // deleting comments that user posted
    await Comment.deleteMany({ user: req.userId });

    return res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
