// Express
const express = require("express");
const customerRouter = express.Router();

// Controllers
const { CustomerController } = require('../controllers/customer.controller');

// Middlewares
const { Auth } = require('../middlewares/auth.middleware');

customerRouter.get("/", Auth, CustomerController.findAll);
customerRouter.post("/", Auth, CustomerController.create);
customerRouter.patch("/:id", Auth, CustomerController.patch);
customerRouter.delete("/:id", Auth, CustomerController.delete);

module.exports = customerRouter;