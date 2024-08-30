const { validationResult } = require('express-validator');

const { CustomerService } = require('../services/customer.service');

const CustomerController = {
  create: async (req, res) => {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) throw new Error('Validation error');

      return res.status(200).json(
        await CustomerService.create(req.body)
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
        await CustomerService.findAll(req.query?.query)
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
  patch: async (req, res) => {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) throw new Error('Validation error');

      return res.status(200).json(
        await CustomerService.patch({ id: req.params.id, ...req.body })
      );
    } catch (error) {
      if (error.message.includes('not found'))
        return res.status(404).json({
          message: error.message,
        });

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
  delete: async (req, res) => {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) throw new Error('Validation error');

      return res.status(200).json(
        await CustomerService.delete(req.params.id)
      );
    } catch (error) {
      if (error.message.includes('not found'))
        return res.status(404).json({
          message: error.message,
        });

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
  CustomerController
};
