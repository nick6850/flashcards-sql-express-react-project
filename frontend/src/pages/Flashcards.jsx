import React, { useEffect } from "react";
import { fetchFlashcards } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Flashcard from "./Flashcard";

function Flashcards() {
  const { flashcards } = useSelector((state) => state.appSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, []);

  console.log(flashcards);

  return (
    <div>
      {flashcards.map((flashcard) => {
        return <Flashcard {...flashcard} />;
      })}
    </div>
  );
}

export default Flashcards;
