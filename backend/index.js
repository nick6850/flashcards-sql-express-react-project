const express = require("express");
const app = express();
require("dotenv").config();
const flashcardsRouter = require("./routes/flashcardsRouter");
const usersRouter = require("./routes/usersRouter");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());
app.use("/flashcards", authMiddleware, flashcardsRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
