const { checkSchema, checkExact } = require("express-validator");

const loginValidator = () => checkExact(
  checkSchema(
    {
      username: {
        exists: {
          errorMessage: 'username should not be empty'
        },
        isString: {
          errorMessage: 'username must be a string'
        },
      },
      password: {
        exists: {
          errorMessage: 'password should not be empty'
        },
        isString: {
          errorMessage: 'password must be a string'
        },
      },
    },
    ['body']
  )
);

module.exports = loginValidator;