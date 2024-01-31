const mongoose = require("mongoose");

// mongodb database address
const mongoUrl = "mongodb://localhost/MyBlog";

// to supress the warning
mongoose.set("strictQuery", true);

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongodb connection error"));

db.once("open", () => {
  console.log("connected to mongodb");
});

module.exports = db;
