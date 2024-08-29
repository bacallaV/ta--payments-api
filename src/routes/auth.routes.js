// Express
const express = require("express");
const usersRouter = express.Router();

// Controllers
const { UserController } = require('../controllers/auth.controller');

usersRouter.post('/login', UserController.login);


module.exports = usersRouter