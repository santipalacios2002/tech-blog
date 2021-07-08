const router = require("express").Router();
const path = require("path");
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
  try {
    console.log("went to root route");
    res.render('home', { 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render('signup', { 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    console.log("went to login route");
    res.render('login', {
      loggedIn: req.session.loggedIn 
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/nextpage", withAuth, async (req, res) => {
  try {
    console.log("went to after login route");
      res.render('afterlogin', {
        loggedIn: true 
      });    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
