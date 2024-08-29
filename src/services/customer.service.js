const crypto = require('crypto');
const fs = require('fs');

const { DB } = require('../config');

const CustomerService = {
  create: async (customer) => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    let { CUSTOMERS } = (JSON.parse(data.toString()));
    if (!CUSTOMERS) throw new Error('Database error');

    const customerId = crypto.randomUUID();
    CUSTOMERS.push({
      id: customerId,
      ...customer,
    });

    fs.writeFileSync(DB, JSON.stringify({
      ...JSON.parse(data.toString()), // Original data
      CUSTOMERS, // Modified data
    }));
  
    return {
      id: customerId,
      ...customer,
    };
  },
  findAll: async () => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    // Getting user from db json file
    let { CUSTOMERS } = JSON.parse(data.toString());
    if (!CUSTOMERS) throw new Error('Database error');

    return {
      data: CUSTOMERS,
    };
  },
  patch: async (customer) => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    let { CUSTOMERS } = (JSON.parse(data.toString()));
    if (!CUSTOMERS) throw new Error('Database error');

    const dbCustomerIndex = CUSTOMERS.findIndex(
      (dbCustomer) => dbCustomer.id === customer.id
    );

    if (dbCustomerIndex === -1) throw new Error('User not found');

    CUSTOMERS[dbCustomerIndex] = {
      ...CUSTOMERS[dbCustomerIndex],
      ...customer,
    }

    // Update database
    fs.writeFileSync(DB, JSON.stringify({
      ...JSON.parse(data.toString()), // Original data
      CUSTOMERS, // Modified data
    }));

    return {
      ...CUSTOMERS[dbCustomerIndex]
    };
  },
  delete: async (id) => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    let { CUSTOMERS } = (JSON.parse(data.toString()));
    if (!CUSTOMERS) throw new Error('Database error');

    const dbCustomerIndex = CUSTOMERS.findIndex(
      (dbCustomer) => dbCustomer.id === id
    );

    if (dbCustomerIndex === -1) throw new Error('User not found');

    CUSTOMERS = CUSTOMERS.filter((dbCustomer) => dbCustomer.id !== id);

    // Update database
    fs.writeFileSync(DB, JSON.stringify({
      ...JSON.parse(data.toString()), // Original data
      CUSTOMERS, // Modified data
    }));

    return {};
  },
};

module.exports = { CustomerService };