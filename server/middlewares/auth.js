/* this middleware checks if jwt token is valid or not 
to keep user authorized */

const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "5uYwxKODsw34UtYagIZNGDo2GqnPY0tC";

module.exports.verifyToken = (req, res, next) => {
  try {
    // if token exists, get jwt token from cookie otherwise null
    const token = req.cookies.token || null;

    // if token doesn't exists
    if (token == null) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // verify jwt token
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    // set user in req object to use in further routes and authorize user
    req.userId = decodedToken._id;

    next();
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
