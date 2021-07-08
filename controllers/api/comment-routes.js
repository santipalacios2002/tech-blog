const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
        include: {model: User}
      });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
    console.log('err:', err)
  }
});


// CREATE a post
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;