const flashcardsRouter = require("express").Router();
const {
  getFlashcards,
  postFlashcard,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardsController");

flashcardsRouter.get("/", getFlashcards);

flashcardsRouter.post("/", postFlashcard);

flashcardsRouter.put("/:id", updateFlashcard);

flashcardsRouter.delete("/:id", deleteFlashcard);

module.exports = flashcardsRouter;
