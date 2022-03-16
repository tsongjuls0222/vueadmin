const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('info_sports_config', {
    // attributes
    isc_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    isc_cross_handi_stop_odds: {
        type: Sequelize.DOUBLE,
        unique: true,
    },
    isc_cross_ou_stop_odds: {
        type: Sequelize.DOUBLE,
        unique: true,
    },
    isc_special_handi_stop_odds: {
        type: Sequelize.DOUBLE,
        unique: true,
    },
    isc_special_ou_stop_odds: {
        type: Sequelize.DOUBLE,
        unique: true,
    },
    isc_cross_start_type: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    isc_cross_start_kind: {
        type: Sequelize.STRING,
        unique: true,
    },
    isc_cross_handi_type: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    isc_multi_handi_period: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    isc_special_start_type: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    isc_special_start_kind: {
        type: Sequelize.STRING,
        unique: true,
    },
    isc_special_handi_type: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_start_type: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_start_kind: {
        type: Sequelize.STRING,
    },
    isc_realtime_handi_type: {
        type: Sequelize.INTEGER,
    },
    isc_folder_type: {
        type: Sequelize.INTEGER,
    },
    isc_cross_open: {
        type: Sequelize.INTEGER,
    },
    isc_cross_odds_type: {
        type: Sequelize.INTEGER,
    },
    isc_cross_timer: {
        type: Sequelize.INTEGER,
    },
    isc_cross_max_odds: {
        type: Sequelize.INTEGER,
    },
    isc_cross_min_folder: {
        type: Sequelize.INTEGER,
    },
    isc_cross_max_folder: {
        type: Sequelize.INTEGER,
    },
    isc_cross_cancel: {
        type: Sequelize.INTEGER,
    },
    isc_cross_cancel_timer: {
        type: Sequelize.INTEGER,
    },
    isc_cross_dup_bet: {
        type: Sequelize.INTEGER,
    },
    isc_cross_bonus_use: {
        type: Sequelize.INTEGER,
    },
    isc_cross_bonus_min: {
        type: Sequelize.FLOAT,
    },
    isc_cross_bonus_3: {
        type: Sequelize.FLOAT,
    },
    isc_cross_bonus_5: {
        type: Sequelize.FLOAT,
    },
    isc_special_open: {
        type: Sequelize.INTEGER,
    },
    isc_special_odds_type: {
        type: Sequelize.INTEGER,
    },
    isc_special_timer: {
        type: Sequelize.INTEGER,
    },
    isc_special_max_odds: {
        type: Sequelize.INTEGER,
    },
    isc_special_min_folder: {
        type: Sequelize.INTEGER,
    },
    isc_special_max_folder: {
        type: Sequelize.INTEGER,
    },
    isc_special_cancel: {
        type: Sequelize.INTEGER,
    },
    isc_special_cancel_timer: {
        type: Sequelize.INTEGER,
    },
    isc_special_dup_bet: {
        type: Sequelize.INTEGER,
    },
    isc_special_bonus_use: {
        type: Sequelize.INTEGER,
    },
    isc_special_bonus_min: {
        type: Sequelize.FLOAT,
    },
    isc_special_bonus_3: {
        type: Sequelize.FLOAT,
    },
    isc_special_bonus_5: {
        type: Sequelize.FLOAT,
    },
    isc_realtime_open: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_odds_type: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_timer: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_max_odds: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_min_folder: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_max_folder: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_cancel: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_cancel_timer: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_dup_bet: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_bonus_use: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_bonus_min: {
        type: Sequelize.INTEGER,
    },
    isc_realtime_bonus_3: {
        type: Sequelize.FLOAT,
    },
    isc_realtime_bonus_5: {
        type: Sequelize.FLOAT,
    },
    isc_realtime_bonus_3: {
        type: Sequelize.FLOAT,
    },
    isc_special_cancel_timer_2: {
        type: Sequelize.INTEGER,
    },
    isc_special_cancel_limit: {
        type: Sequelize.INTEGER,
    },

}, {
    // options
    timestamps: false
});


module.exports = temp;