const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "flashcard_project",
});

app.use(express.json());

app.get("/flashcards", (req, res) => {
  const q = "SELECT * FROM flashcards";

  db.query(q, (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json(result);
  });
});

app.post("/flashcards", (req, res) => {
  const { question, answer, category, difficulty, user_id } = req.body;

  const q =
    "INSERT INTO flashcards (question, answer, category, difficulty, user_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    q,
    [question, answer, category, difficulty, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      res.json(result);
    }
  );
});

app.put("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  const { question, answer, category, difficulty } = req.body;
  let setClause = [];
  let setValues = [];

  if (question) {
    setClause.push("question = ?");
    setValues.push(question);
  }
  if (answer) {
    setClause.push("answer = ?");
    setValues.push(answer);
  }
  if (category) {
    setClause.push("category = ?");
    setValues.push(category);
  }
  if (difficulty) {
    setClause.push("difficulty = ?");
    setValues.push(difficulty);
  }

  const q = `UPDATE flashcards SET ${setClause.join(", ")} WHERE id = ?`;
  const values = [...setValues, id];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(result);
  });
});

app.delete("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM flashcards WHERE id = ?";

  db.query(q, id, (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.status(200).json(result);
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
