const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Temp = db.define('teams_list', {
    // attributes
    num: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    country_code: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    team_id: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    team_name: {
        type: Sequelize.STRING,
        unique: true,
    },
    team_name_kor: {
        type: Sequelize.STRING,
    },
    sports_id: {
        type: Sequelize.INTEGER,
    },
    team_name_new: {
        type: Sequelize.STRING,
    },
    team_name_kor_new: {
        type: Sequelize.STRING,
    },
    edited: {
        type: Sequelize.TINYINT,
    },
    team_country: {
        type: Sequelize.STRING,
    },
    img_file: {
        type: Sequelize.TEXT,
    }
}, {
    // options
    timestamps: false
});

// Code.removeAttribute('createdAt');
// Code.removeAttribute('updatedAt');

module.exports = Temp;