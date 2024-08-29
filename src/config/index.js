const fs = require('fs');

const {
  PORT,
  JWT_KEY,
} = process.env;

if( !PORT || !JWT_KEY ) {
  throw new Error('Not all environment variables provided');
}

const DB = './db.json';

if (!fs.existsSync(DB)) {
  fs.writeFileSync(DB, JSON.stringify({
    PAYMENTS: [],
    USERS: [
      {
        name: 'Administrador',
        lastName: '',
        username: 'admin',
        password: '$2b$10$LqeVLCkApPV8ELnPlXVED.QI9hCNgXHzZ54iL/43G.RtSelwUnAzK', // 123
      },
    ],
    CUSTOMERS: [],
  }));
}

module.exports = {
  PORT,
  DB,
  JWT_KEY
};