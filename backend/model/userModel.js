const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connectWithDb");
const Todo = require("./noteModel");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");

//define todo model
const User = sequelize.define(
    'User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


sequelize.sync({ logging: false })
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronized database: ', err))

module.exports = User;