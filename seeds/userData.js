const User = require('../models/User');

const userdata = [
  {
    username: 'johndoe',
    email: 'jdoe@gmail.com',
    password: 'password',
  },
];

const seedUserData = () => User.bulkCreate(userdata);

module.exports = seedUserData;