import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFlashcard } from "../redux/appSlice";

function EditFlashcard({
  id,
  question,
  answer,
  category,
  difficulty,
  setIsEdited,
}) {
  const [data, setData] = useState({ question, answer, category, difficulty });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFlashcard = {
      id,
      question,
      answer,
      category,
      difficulty,
    };

    dispatch(updateFlashcard(updatedFlashcard));
    setIsEdited(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        value={data.question}
        onChange={handleChange}
        required
      />

      <label htmlFor="answer">Answer:</label>
      <textarea
        id="answer"
        value={data.answer}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={data.category}
        onChange={handleChange}
      />

      <label htmlFor="difficulty">Difficulty:</label>
      <input
        type="text"
        id="difficulty"
        value={data.difficulty}
        onChange={handleChange}
      />

      <button type="submit">Add Flashcard</button>
    </form>
  );
}

export default EditFlashcard;
