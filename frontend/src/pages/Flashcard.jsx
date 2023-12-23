import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFlashcard } from "../redux/appSlice";
import EditFlashcard from "./EditFlashcard";

function Flashcard(props) {
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  if (isEdited) {
    return <EditFlashcard {...props} setIsEdited={setIsEdited} />;
  }

  return (
    <div className="border w-96 h-48 m-auto mb-3">
      <button
        onClick={() => dispatch(deleteFlashcard(props.id))}
        className="bg-red-900 text-white px-3 mb-3"
      >
        Delete
      </button>
      <button
        onClick={() => setIsEdited(true)}
        className="bg-blue-900 text-white px-3 mb-3"
      >
        Edit
      </button>
      <div>{props.question}</div>
      <div>{props.category}</div>
      <div>{props.difficulty}</div>
    </div>
  );
}

export default Flashcard;
