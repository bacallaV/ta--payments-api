const { checkSchema, checkExact } = require("express-validator");

const paramIdValidator = () => checkExact(
  checkSchema(
    {
      id: {
        exists: {
          errorMessage: 'id should not be empty',
        },
        isUUID: {
          errorMessage: 'id is not a valid',
        },
      }
    },
    ['params']
  )
);

module.exports = paramIdValidator;