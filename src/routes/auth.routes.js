// Express
const express = require("express");
const usersRouter = express.Router();

// Controllers
const { UserController } = require('../controllers/auth.controller');

// Validators
const loginValidator = require("../utils/validators/login.validator");

usersRouter.post('/login', loginValidator(), UserController.login);


module.exports = usersRouter