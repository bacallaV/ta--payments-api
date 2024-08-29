// Express
const express = require("express");
const usersRouter = express.Router();

// Controllers
const { UserController } = require('../controllers/auth.controller');

// Middlewares
// const { Auth } = require('../middlewares/auth.middleware');

// usersRouter.get("/", Auth, UserController.findAll);
// usersRouter.post("/", UserController.create);

usersRouter.post('/login', UserController.login);


module.exports = usersRouter