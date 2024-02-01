const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

    // if user doesnt exists
    if (!user) {
      return res.status(400).json({
        message: "User doesnt exist",
      });
    }

    // checking if inputted password and password in db matches
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    // generating jwt token to authorize user after login
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
