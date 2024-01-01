import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postFlashcard } from "../redux/appSlice";

function NewFlashcard({ setIsAddingNewCard }) {
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
    <form onSubmit={handleSubmit} className="flex flex-col m-auto max-w-96">
      <span
        className="cursor-pointer bg-red-800 text-white w-min px-1 rounded-md text-l self-end"
        onClick={() => setIsAddingNewCard(false)}
      >
        &#10005;
      </span>
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        value={question}
        className="border"
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      <label className="mt-1" htmlFor="answer">
        Answer:
      </label>
      <textarea
        id="answer"
        value={answer}
        className="border"
        onChange={(e) => setAnswer(e.target.value)}
        required
      ></textarea>

      <label className="mt-1" htmlFor="category">
        Category:
      </label>
      <input
        type="text"
        id="category"
        value={category}
        className="border"
        onChange={(e) => setCategory(e.target.value)}
      />

      <label className="mt-1" htmlFor="difficulty">
        Difficulty:
      </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border bg-white p-1"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button className="bg-green-800 text-white px-3 mt-3 w-fit m-auto">
        Add Flashcard
      </button>
    </form>
  );
}

export default NewFlashcard;
