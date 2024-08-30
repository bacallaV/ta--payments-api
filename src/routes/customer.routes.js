// Express
const express = require("express");
const customerRouter = express.Router();

// Controllers
const { CustomerController } = require('../controllers/customer.controller');

// Middlewares
const { Auth } = require('../middlewares/auth.middleware');

// Validators
const searchCustomersValidator = require("../utils/validators/search-customers.validator");
const paramIdValidator = require("../utils/validators/param-id.validator");
const {
    createCustomerValidator,
    patchCustomerValidator
} = require("../utils/validators/customer.validator");

customerRouter.get("/", Auth, searchCustomersValidator(), CustomerController.findAll);
customerRouter.post("/", Auth, createCustomerValidator(), CustomerController.create);
customerRouter.patch("/:id", Auth, paramIdValidator(), patchCustomerValidator(), CustomerController.patch);
customerRouter.delete("/:id", Auth, paramIdValidator(), CustomerController.delete);

module.exports = customerRouter;