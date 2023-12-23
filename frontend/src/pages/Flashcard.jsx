import React from "react";

function Flashcard({
  id,
  question,
  answer,
  category,
  difficulty,
  last_modified,
  user_id,
}) {
  return <div>{question}</div>;
}

export default Flashcard;
