const { checkSchema, checkExact } = require("express-validator");

const searchCustomersValidator = () => checkExact(
  checkSchema(
    {
      query: {
        optional: true,
        isString: true,
        toLowerCase: true,
      },
    },
    ['query']
  )
);

module.exports = searchCustomersValidator;