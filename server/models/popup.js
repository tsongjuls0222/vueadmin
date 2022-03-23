const Sequelize = require('sequelize');
const db = require('../db_config.js');
const popup = db.define('popup', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    popup_title: {
        type: Sequelize.TEXT,
    },
    content: {
        type: Sequelize.TEXT,
    },
    created: {
        type: Sequelize.DATE,
        // default: Date.now,
    },
    leftpx: {
        type: Sequelize.STRING,
    },
    toppx: {
        type: Sequelize.STRING,
    },
    widthpx: {
        type: Sequelize.STRING,
    },
    heightpx: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.TINYINT,
    },
    settingsauto: {
        type: Sequelize.TINYINT,
    },
    location: {
        type: Sequelize.STRING,
    },
}, {
    // options
    timestamps: false
});


module.exports = popup;