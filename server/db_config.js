const Sequelize = require('sequelize');
module.exports = new Sequelize('vicsportlive', 'root', '', {
    host: '192.168.10.149',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
});