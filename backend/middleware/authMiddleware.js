const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(req.headers);
  next();
};

module.exports = authMiddleware;
