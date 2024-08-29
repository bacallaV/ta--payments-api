const { CustomerService } = require('../services/customer.service');

const CustomerController = {
  create: async (req, res) => {
    try {
      return res.status(200).json(
        await CustomerService.create(req.body)
      );
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
  findAll: async (_, res) => {
    try {
      return res.status(200).json(
        await CustomerService.findAll()
      );
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
  patch: async (req, res) => {
    try {
      return res.status(200).json(
        await CustomerService.patch({ id: req.params.id, ...req.body })
      );
    } catch (error) {
      if (error.message.includes('not found'))
        return res.status(404).json({
          message: error.message,
        });

      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
  delete: async (req, res) => {
    try {
      return res.status(200).json(
        await CustomerService.delete(req.params.id)
      );
    } catch (error) {
      if (error.message.includes('not found'))
        return res.status(404).json({
          message: error.message,
        });

      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  },
};

module.exports = {
  CustomerController
};
