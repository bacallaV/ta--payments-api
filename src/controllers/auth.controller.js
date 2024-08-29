const { UserService } = require('../services/auth.service');

const UserController = {
  login: async (req, res) => {
    try {
      return res.status(200).json(
        await UserService.login(req.body)
      );
    } catch (error) {
      if (error.message === 'Invalid credentials')
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
  UserController
};
