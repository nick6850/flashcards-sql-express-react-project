const usersRouter = require("express").Router();
const validator = require("validator");
const db = require("../dbSettings");

usersRouter.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Wrong email format" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Weak password" });
  }

  db.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE username = ?) AS username_exists;",
    username,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result[0].username_exists === 1) {
        return res.status(400).json({ error: "This username has been taken" });
      }

      res.status(200).json({ message: "Success" });
    }
  );
});

module.exports = usersRouter;
