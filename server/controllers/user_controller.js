const bcrypt = require("bcrypt");
const User = require("../models/user");

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
