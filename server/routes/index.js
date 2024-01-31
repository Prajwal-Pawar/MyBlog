const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  try {
    return res.status(200).json({
      message: "myblog api is working",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

module.exports = router;
