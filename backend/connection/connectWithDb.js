const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
})

//connection with DB
async function connectDb() {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    }catch(error){
        console.error('Failed to connect with DB: ', error)
    }
}


module.exports = { connectDb, sequelize } 