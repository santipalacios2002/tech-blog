const router = require("express").Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    console.log("went to route");
    res.render('all');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    console.log("went to login route");
    res.render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
