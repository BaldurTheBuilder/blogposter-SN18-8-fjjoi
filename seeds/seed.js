const sequelize = require('../config/connection');
const {User, BlogPost, Comment} = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {individualHooks: true, returning: true});
    await BlogPost.bulkCreate(postData);
    await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();