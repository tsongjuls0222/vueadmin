const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Temp = db.define('leagu_list', {
    // attributes
    num: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    leagu_id: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    game_code: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    leagu_name: {
        type: Sequelize.STRING,
        unique: true,
    },
    leagu_names: {
        type: Sequelize.STRING,
    },
    leagu_icon: {
        type: Sequelize.STRING,
    },
    reg_countycode: {
        type: Sequelize.STRING,
    },
    reg_countyname: {
        type: Sequelize.STRING,
    },
    reg_type: {
        type: Sequelize.DataTypes.ENUM({
            values: ['prematch', 'realtime', 'both']
        }),
    },
    reg_date: {
        type: Sequelize.DATE,
    },
    reg_area: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
    statuss: {
        type: Sequelize.STRING,
    },
    league_sort: {
        type: Sequelize.INTEGER,
    },
    league_sorts: {
        type: Sequelize.INTEGER,
    },
    img_file: {
        type: Sequelize.STRING,
    },
    img_files: {
        type: Sequelize.STRING,
    },
}, {
    // options
    timestamps: false
});

// Code.removeAttribute('createdAt');
// Code.removeAttribute('updatedAt');

module.exports = Temp;