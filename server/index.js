const express = require("express");
const db = require("./configs/mongoose");

const app = express();

const PORT = 8000;

// body parsers : to understand req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
