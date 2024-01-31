const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  try {
    return res.status(200).json({
      message: "MyBlog API is working",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// user routes
router.use("/user", require("./user"));

module.exports = router;
