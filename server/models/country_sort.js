const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Temp = db.define('country_sort', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    game_section: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    country_code: {
        type: Sequelize.STRING,
        unique: true,
    },
    country_title: {
        type: Sequelize.STRING,
        unique: true,
    },
    country_titles: {
        type: Sequelize.STRING,
    },
    sort_num: {
        type: Sequelize.INTEGER,
    },
    sort_nums: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.STRING,
    },
    statuss: {
        type: Sequelize.STRING,
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