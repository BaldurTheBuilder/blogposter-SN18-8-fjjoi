const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

    //comments have: creator (foreignkey to user), blogpost (foreignkey to blogpost) contents, and date created
Comment.init(
    {
        id: {

        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;