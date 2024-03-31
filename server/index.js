const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./configs/mongoose");

const app = express();

const PORT = 8000;

// body parsers : to understand req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// allow cors
// and set origin and credentials for cookies
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// use cookies
app.use(cookieParser());

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
