const { checkSchema, checkExact } = require("express-validator");

const paymentValidator = () => checkExact(
  checkSchema(
    {
      customerId: {
        exists: {
          errorMessage: 'customerId should not be empty'
        },
        isString: {
          errorMessage: 'customerId must be a string'
        },
        isUUID: {
          errorMessage: 'customerId must be an id'
        },
      },
      concept: {
        exists: {
          errorMessage: 'concept should not be empty'
        },
        isString: {
          errorMessage: 'concept must be a string'
        },
      },
      amount: {
        exists: {
          errorMessage: 'amount should not be empty'
        },
        isNumeric: {
          errorMessage: 'amount must be a number',
        },
        toFloat: {
          errorMessage: 'amount must be a number',
        }
      },
    },
    ['body']
  )
);

const getAllPaymentsValidator = () => checkExact(
  checkSchema(
    {
      sortBy: {
        optional: true,
        matches: {
          options: [/\b(?:amount|date)\b/],
          errorMessage: "invalid value for sortBy parameter",
        },
      },
      sortOrder: {
        optional: true,
        matches: {
          options: [/\b(?:asc|desc)\b/],
          errorMessage: "invalid value for sortOrder parameter",
        },
      },
    },
    ['query']
  )
);

module.exports = {
  paymentValidator,
  getAllPaymentsValidator,
};