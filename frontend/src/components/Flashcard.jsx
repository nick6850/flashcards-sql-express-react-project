import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFlashcard } from "../redux/appSlice";
import EditFlashcard from "./EditFlashcard";
import ReactCardFlip from "react-card-flip";

function Flashcard(props) {
  const [isEdited, setIsEdited] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const dispatch = useDispatch();

  if (isEdited) {
    return <EditFlashcard {...props} setIsEdited={setIsEdited} />;
  }

  return (
    <div className="mt-1">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="w-96 h-96 border p-4 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="text-sm text-gray-700 text-center">
              <div>{props.category}</div>
              <div>{props.difficulty}</div>
            </div>
            <div>
              <button
                onClick={() => setIsEdited(true)}
                className="bg-blue-900 text-white px-3 mb-3 mr-1"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteFlashcard(props.id))}
                className="bg-red-900 text-white px-3 mb-3"
              >
                Delete
              </button>
            </div>
          </div>
          <h1 className="font-bold text-2xl break-words">{props.question}</h1>

          <button
            className="w-fit self-center text-white bg-green-800 px-2"
            onClick={() => setIsFlipped(true)}
          >
            See the answer
          </button>
        </div>

        <div
          className="w-96 h-96 border p-4 flex flex-col justify-center "
          onClick={() => setIsFlipped(false)}
        >
          <div
            className={`h-fit text-xl ${
              props.answer.length > 242 ? "overflow-scroll" : ""
            }`}
          >
            {props.answer}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Flashcard;
