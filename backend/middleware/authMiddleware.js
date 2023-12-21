const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization.startsWith("Bearer")) {
    return res.status(400).json({
      error: "Invalid authorization header. Please provide a Bearer token.",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error:
        "Invalid authorization header. Please provide a valid Bearer token.",
    });
  }
};

module.exports = authMiddleware;
