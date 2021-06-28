const router = require("express").Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    console.log("went to route");
    res.status(200).json({ message: "went to root" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
