const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const postSeedData = require('./postSeedData.json');
const commentSeedData = require('./commentSeedData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const posts = await Post.bulkCreate(postSeedData);

  const comments = await Comment.bulkCreate(commentSeedData);

  process.exit(0);
};

seedDatabase();
