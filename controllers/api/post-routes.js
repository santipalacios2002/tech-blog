const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: Comment, required: true
      },
      {
        model: User, required: true
      }
    ]

    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.log('err:', err)
  }
});



// CREATE a post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET a single location
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: { model: Comment}
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// // DELETE a location
// router.delete('/:id', async (req, res) => {
//   try {
//     const locationData = await Location.destroy({
//       where: {
//         id: req.params.id
//       }
//     });

//     if (!locationData) {
//       res.status(404).json({ message: 'No location found with this id!' });
//       return;
//     }

//     res.status(200).json(locationData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
