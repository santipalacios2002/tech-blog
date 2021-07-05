const router = require('express').Router();
const { User, Comments, Posts } = require('../../models');

// CREATE new user
// data should look in format:
// {
//     "email": "jdoe@gmail.com",
//     "password": "password"
// }
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    //find user with email
    const dbUserData = await User.findOne({where: {email: req.body.email }});
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
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      res.status(200).json({ user: dbUserData.email, message: 'You are now logged in!', log_status: req.session.loggedIn });
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
