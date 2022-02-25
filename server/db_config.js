const Sequelize = require('sequelize');
module.exports = new Sequelize('vicsportlive', 'nekochan', '-M4jya8WCzx*17_K', {
    //GlnA8CcAY6b7QKfg
    //EgD@T*XCxwK4l77B
    //iy1QybgOM0/MR4]m
    // -M4jya8WCzx*17_K
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
    },
});