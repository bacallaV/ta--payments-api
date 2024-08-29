const { validationResult } = require('express-validator');
const { UserService } = require('../services/auth.service');

const UserController = {
  login: async (req, res) => {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) throw new Error('Validation error');

      return res.status(200).json(
        await UserService.login(req.body)
      );
    } catch (error) {
      if (error.message === 'Invalid credentials')
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
  UserController
};
