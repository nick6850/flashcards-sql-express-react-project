const usersRouter = require("express").Router();
const { signup, signin } = require("../controllers/usersController");

usersRouter.post("/signup", signup);

usersRouter.post("/signin", signin);

module.exports = usersRouter;
