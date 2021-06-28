const router = require('express').Router();
const User = require('../../models/User');

// CREATE new user
// data should look in format:
// {
//     "username": "john",
//     "email": "jdoe@gmail.com",
//     "password": "password"
// }
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    //find user with email
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //if it is not found return message
    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email. Please try again!' });
      return;
    }
    //if use found but password is not valid then through message
    const validPassword = await dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ user: [dbUserData.username, dbUserData.email], message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({message: 'You successfully logged out'}).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
