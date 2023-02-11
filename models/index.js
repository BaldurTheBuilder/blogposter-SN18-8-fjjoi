const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');

//relationships

//user has many blogposts
//blogposts belongs to user

//user has many comments
//comments belongs to user

//blogposts has many comments
//comments belong to blogpost

module.exports = {
    User,
    Comment,
    BlogPost
}