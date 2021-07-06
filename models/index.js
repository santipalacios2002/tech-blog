const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    onDelete: 'CASCADE',
});

Post.hasMany(Comment, {});

module.exports = { Post, User, Comment };
