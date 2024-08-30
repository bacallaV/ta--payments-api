const { PaymentService } = require('../services/payment.service');
const { validationResult } = require('express-validator');

const PaymentController = {
  create: async (req, res) => {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) throw new Error('Validation error');

      return res.status(200).json(
        await PaymentService.create(req.body)
      );
    } catch (error) {
      if (error.message === 'Validation error')
        return res.status(400).json({
          message: error.message,
          errors: validationErrors.errors,
        });

      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
  findAll: async (req, res) => {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) throw new Error('Validation error');

      return res.status(200).json(
        await PaymentService.findAll({
          sortBy: req.query?.sortBy,
          sortOrder: req.query?.sortOrder ?? 'asc',
        })
      );
    } catch (error) {
      if (error.message === 'Validation error')
        return res.status(400).json({
          message: error.message,
          errors: validationErrors.errors,
        });

      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
};

module.exports = {
  PaymentController
};
