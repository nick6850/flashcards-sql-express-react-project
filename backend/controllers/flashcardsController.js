const db = require("../dbSettings");

const getFlashcards = (req, res) => {
  const q = "SELECT * FROM flashcards WHERE user_id = ?";

  db.query(q, req.user_id, (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json(result);
  });
};

const postFlashcard = (req, res) => {
  const { question, answer, category, difficulty } = req.body;

  const insertQuery =
    "INSERT INTO flashcards (question, answer, category, difficulty, user_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    insertQuery,
    [question, answer, category, difficulty, req.user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
    }
  );

  const selectQuery = "SELECT * FROM flashcards WHERE id = LAST_INSERT_ID()";
  db.query(selectQuery, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const newFlashcard = result[0];
    res.json(newFlashcard);
  });
};

const updateFlashcard = (req, res) => {
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

  const q = `UPDATE flashcards SET ${setClause.join(
    ", "
  )} WHERE id = ? AND user_id = ?`;
  const values = [...setValues, id, req.user_id];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error:
          "You can't update this flashcard either because it doesn't belong to you or it doesn't exist",
      });
    }

    res.status(200).json(result);
  });
};
const deleteFlashcard = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM flashcards WHERE id = ? AND user_id = ?";
  db.query(q, [id, req.user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error:
          "You can't delete this flashcard either because it doesn't belong to you or it doesn't exist",
      });
    }

    res.status(200).json(result);
  });
};

module.exports = {
  getFlashcards,
  postFlashcard,
  updateFlashcard,
  deleteFlashcard,
};
