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
      question: data.question,
      answer: data.answer,
      category: data.category,
      difficulty: data.difficulty,
    };

    dispatch(updateFlashcard(updatedFlashcard));
    setIsEdited(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col border p-2">
      <label htmlFor="question">Question:</label>
      <input
        className="border"
        type="text"
        id="question"
        value={data.question}
        onChange={handleChange}
        required
      />

      <label className="mt-1" htmlFor="answer">
        Answer:
      </label>
      <textarea
        className="border"
        id="answer"
        value={data.answer}
        onChange={handleChange}
        required
      ></textarea>

      <label className="mt-1" htmlFor="category">
        Category:
      </label>
      <input
        className="border"
        type="text"
        id="category"
        value={data.category}
        onChange={handleChange}
      />

      <label className="mt-1" htmlFor="difficulty">
        Difficulty:
      </label>
      <select
        id="difficulty"
        value={data.difficulty}
        onChange={handleChange}
        className="border bg-white p-1"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button
        className="mt-1 bg-blue-900 text-white w-fit m-auto px-3 mt-5"
        type="submit"
      >
        Update flashcard
      </button>
    </form>
  );
}

export default EditFlashcard;
