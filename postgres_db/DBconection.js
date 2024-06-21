const { Sequelize, DataTypes } = require('sequelize');

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

const HashTable = sequelize.define('hash_list', {
    hash: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }}, {
        tableName: 'hash_list',
        timestamps: false
}
);

exports.model = HashTable;