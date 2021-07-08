const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'userId'
});

User.hasMany(Comment)

Post.belongsTo(User, {

});

Comment.belongsTo(User, {

});

Post.hasMany(Comment, {
  
});

Comment.belongsTo(Post)

module.exports = { Post, User, Comment };
