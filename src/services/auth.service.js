const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { DB, JWT_KEY } = require('../config');

const UserService = {
  login: async (user) => {
    // Reading file
    const data = fs.readFileSync(DB);
    if (!data) throw new Error('Database error');

    // Getting user from db json file
    let { USERS } = JSON.parse(data.toString());
    if (!USERS) throw new Error('Database error');

    const existingUser = USERS.find(dbUser => dbUser.username === user.username);
    if (!existingUser) throw new Error('Invalid credentials');

    // Checking password coincidence 
    const isValid = await bcrypt.compare(user.password, existingUser.password);

    if(!isValid) throw new Error('Invalid credentials');

    return {
      token: jwt.sign(
        { user: existingUser.id },
        JWT_KEY,
        { expiresIn: '1h' },
      ),
    };
  },
};

module.exports = { UserService };