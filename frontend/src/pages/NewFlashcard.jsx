import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postFlashcard } from "../redux/appSlice";

function NewFlashcardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFlashcard = {
      question,
      answer,
      category,
      difficulty,
    };

    dispatch(postFlashcard(newFlashcard));

    setQuestion("");
    setAnswer("");
    setCategory("");
    setDifficulty("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      <label htmlFor="answer">Answer:</label>
      <textarea
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      ></textarea>

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <label htmlFor="difficulty">Difficulty:</label>
      <input
        type="text"
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <button type="submit">Add Flashcard</button>
    </form>
  );
}

export default NewFlashcardForm;
