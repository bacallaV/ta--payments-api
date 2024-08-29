const { PaymentService } = require('../services/payment.service');

const PaymentController = {
  create: async (req, res) => {
    try {
      return res.status(200).json(
        await PaymentService.create(req.body)
      );
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
  findAll: async (req, res) => {
    try {
      return res.status(200).json(
        await PaymentService.findAll()
      );
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
};

module.exports = {
  PaymentController
};
