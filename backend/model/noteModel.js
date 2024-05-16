const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connectWithDb");

//define todo model
const Todo =  sequelize.define(
    'Todo', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

module.exports = Todo;