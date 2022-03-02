const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('info_user_withdrawal_set', {
    // attributes
    num: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
    },
    available_time: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    withdraw_next_hour: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    withdraw_onetime: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    withdraw_oneday: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    withdraw_maxcnt: {
        type: Sequelize.INTEGER,
        unique: true,
    },

}, {
    // options
    timestamps: false
});


module.exports = temp;