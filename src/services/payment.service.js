const fs = require('fs');

const { DB } = require('../config');

const PaymentService = {
  create: async (payment) => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    // Getting user from db json file
    let { PAYMENTS } = JSON.parse(data.toString());
    if (!PAYMENTS) throw new Error('Database error');

    const newPayment = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...payment,
    }
    PAYMENTS.push(newPayment);

    // Update database
    fs.writeFileSync(DB, JSON.stringify({
      ...JSON.parse(data.toString()), // Original data
      PAYMENTS, // Modified data
    }));

    return newPayment;
  },
  findAll: async () => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    // Getting user from db json file
    let { PAYMENTS } = JSON.parse(data.toString());
    if (!PAYMENTS) throw new Error('Database error');

    return {
      data: PAYMENTS
    };
  },
};

module.exports = { PaymentService };