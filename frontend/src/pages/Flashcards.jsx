import React, { useEffect } from "react";
import { fetchFlashcards } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Flashcard from "./Flashcard";
import { Navigate } from "react-router-dom";
import NewFlashcard from "./NewFlashcard";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Flashcards() {
  const { flashcards, isLoggedIn } = useSelector((state) => state.appSlice);
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

  return (
    <div>
      <NewFlashcard />
      <div className="w-96 m-auto">
        <Slider {...settings}>
          {flashcards.map((flashcard) => {
            return <Flashcard key={flashcard.id} {...flashcard} />;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Flashcards;
