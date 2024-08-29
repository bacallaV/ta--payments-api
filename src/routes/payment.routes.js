// Express
const express = require("express");
const paymentRouter = express.Router();

// Controllers
const { PaymentController } = require('../controllers/payment.controller');

// Middlewares
const { Auth } = require('../middlewares/auth.middleware');

paymentRouter.get("/", Auth, PaymentController.findAll);
paymentRouter.post("/", Auth, PaymentController.create);

module.exports = paymentRouter;