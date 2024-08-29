const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { DB } = require('../config');

const UserService = {
  create: async (req, res) => {
    // const newUser = req.body;

    // const existingUser = await User.findOne({
    //   where: {
    //     email: newUser.email,
    //   }
    // });
    // if(existingUser) return res.status(400).json({
    //   message: 'Email already used'
    // });

    // // Crypting password
    // newUser.password = await bcrypt.hash(newUser.password, 10);
    // // Creating new user
    // const user = await User.create(newUser)
  
    // // Handling response
    // if(user) return res.status(200).json({
    //   message: 'User created successfully'
    // });
  
    res.status(500).json({
      message: 'Error while creating user'
    });
  },
  findAll: async (req, res) => {
    return res.status(200).json({
      data: [],
    });
  },
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
        { user: user.id },
        'my-key',
        { expiresIn: '1h' },
      ),
    };
  },
};

module.exports = { UserService };