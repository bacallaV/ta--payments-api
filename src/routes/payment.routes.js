// Express
const express = require("express");
const paymentRouter = express.Router();

// Controllers
const { PaymentController } = require('../controllers/payment.controller');

// Middlewares
const { Auth } = require('../middlewares/auth.middleware');

// Validators
const {
    paymentValidator,
    getAllPaymentsValidator,
} = require("../utils/validators/payment.validator");

paymentRouter.get("/", Auth, getAllPaymentsValidator(), PaymentController.findAll);
paymentRouter.post("/", Auth, paymentValidator(), PaymentController.create);

module.exports = paymentRouter;