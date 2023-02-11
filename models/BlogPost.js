const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

    //blogposts have: title, contents, creator (foreignKey to user), and date created
BlogPost.init(
    {
        id: {

        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogPost',
    }
);

module.exports = BlogPost;