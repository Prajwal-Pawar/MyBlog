const express = require("express");
const db = require("./configs/mongoose");

const app = express();

const PORT = 8000;

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
