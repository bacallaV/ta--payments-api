const { checkSchema, checkExact } = require("express-validator");

const createCustomerValidator = () => checkExact(
  checkSchema(
    {
      name: {
        exists: {
          errorMessage: 'name should not be empty'
        },
        isString: {
          errorMessage: 'name must be a string'
        },
      },
      lastname: {
        exists: {
          errorMessage: 'lastname should not be empty'
        },
        isString: {
          errorMessage: 'lastname must be a string'
        },
      },
      dateOfBirth: {
        exists: {
          errorMessage: 'dateOfBirth should not be empty'
        },
        isISO8601: {
          errorMessage: 'dateOfBirth must be a date string'
        }
      },
    },
    ['body']
  )
);

const patchCustomerValidator = () => checkExact(
  checkSchema(
    {
      name: {
        optional: true,
        isString: {
          errorMessage: 'name must be a string'
        },
      },
      lastname: {
        optional: true,
        isString: {
          errorMessage: 'lastname must be a string'
        },
      },
      dateOfBirth: {
        optional: true,
        isDate: {
          errorMessage: 'dateOfBirth must be a date string'
        }
      },
    },
    ['body']
  )
);

module.exports = {
  createCustomerValidator,
  patchCustomerValidator,
};