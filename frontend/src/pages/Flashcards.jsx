import React, { useEffect } from "react";
import { fetchFlashcards } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Flashcard from "./Flashcard";
import { Navigate, useSearchParams } from "react-router-dom";
import NewFlashcard from "./NewFlashcard";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Flashcards() {
  const { flashcards, isLoggedIn } = useSelector((state) => state.appSlice);
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, []);

  if (!isLoggedIn) {
    <Navigate to="/signin" replace={true} />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const difficulty = searchParams.get("difficulty");

  const filteredFlashcards = difficulty
    ? flashcards.filter(
        (flashcard) => flashcard.difficulty.toLowerCase() == difficulty
      )
    : flashcards;

  return (
    <div>
      <NewFlashcard />

      {!flashcards.length ? (
        <h1 className="text-xl italic font-bold text-center mt-3">
          You haven't added any flashcards yet.
        </h1>
      ) : (
        <div className="w-96 m-auto">
          <div className="flex flex-col w-full items-end mt-3 text-xs gap-1">
            <p className="mr-1">Filter by difficulty:</p>
            <div className="font-bold">
              <button
                onClick={() => setSearchParams({ difficulty: "easy" })}
                className="border rounded-md px-2"
              >
                Easy
              </button>
              <button
                onClick={() => setSearchParams({ difficulty: "medium" })}
                className="border rounded-md px-2"
              >
                Medium
              </button>
              <button
                onClick={() => setSearchParams({ difficulty: "hard" })}
                className="border rounded-md px-2"
              >
                Hard
              </button>
              <button
                onClick={() => setSearchParams()}
                className="border rounded-md px-2"
              >
                Clear
              </button>
            </div>
          </div>
          <Slider {...settings}>
            {filteredFlashcards.map((flashcard) => {
              return <Flashcard key={flashcard.id} {...flashcard} />;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default Flashcards;
