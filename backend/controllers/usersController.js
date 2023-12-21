const validator = require("validator");
const jwt = require("jsonwebtoken");
const db = require("../dbSettings");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  let hashedPassword;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Wrong email format" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Weak password" });
  }

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err.message);
        if (err.message.includes("users.unique_username")) {
          return res
            .status(404)
            .json({
              error: "The username has already been taken. Choose another one",
            });
        } else if (err.message.includes("users.unique_email")) {
          return res
            .status(404)
            .json({ error: "User with this email already exists." });
        }

        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res
        .status(200)
        .json({ message: "You have been registered successfully" });
    }
  );
};
const signin = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT id, password FROM users where email = ?";
  db.query(q, email, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!result.length) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }

    const match = await bcrypt.compare(password, result[0].password);

    if (!match) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }
    res.status(200).json({ token: generateToken(result[0].id) });
  });
};

const generateToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET);
};

module.exports = { signup, signin };
