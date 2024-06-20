const Sequelize = require('sequelize');
const dotenv = require('dotenv');
// import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    "hash_db",
    'root',
    'root',
    {
        host: "localhost",
        dialect: 'postgres',
        port: 5400,
    }
);
exports.sequelize = sequelize;