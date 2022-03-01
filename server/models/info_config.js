const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('info_config', {
    // attributes
    icg_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    icg_bonus_max: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icg_new_bonus: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icg_daily_bonus: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icg_re_bonus: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icg_rolling: {
        type: Sequelize.STRING,
        unique: true,
    },
    icg_max_bet: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    icg_min_bet: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    icg_max_win: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    icg_default_odds: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icg_default_timer: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icg_sudden_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_payback_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_tuesday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_wednesday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_thursday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_friday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_saturday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_sunday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_monday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_tuesday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_wednesday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_thursday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_friday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_saturday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_sunday_max_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_recommender_payback_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_casino_payback_bonus: {
        type: Sequelize.BIGINT,
    },
    icg_sudden_max_bonus_tuesday: {
        type: Sequelize.BIGINT,
    },
    icg_sudden_max_bonus_wednesday: {
        type: Sequelize.BIGINT,
    },
    icg_sudden_max_bonus_thursday: {
        type: Sequelize.BIGINT,
    },
    icg_sudden_max_bonus_friday: {
        type: Sequelize.BIGINT,
    },
    icg_sudden_max_bonus_saturday: {
        type: Sequelize.BIGINT,
    },
    icg_sudden_max_bonus_sunday: {
        type: Sequelize.BIGINT,
    },

}, {
    // options
    timestamps: false
});


module.exports = temp;