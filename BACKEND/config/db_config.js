const sequelize = require('sequelize');
//const dotenv = require('dotenv');

/*
const db = new sequelize(process.env.DATABASE,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'

});*/

const db = new sequelize('latihan','zakka','',{
    host: 'localhost',
    dialect: 'mysql'

})


module.exports = db;