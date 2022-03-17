const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('info_level', {
    // attributes
    ilv_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    ilv_level: {
        type: Sequelize.INTEGER,
    },
    ilv_icon: {
        type: Sequelize.STRING,
    },
    ilv_name: {
        type: Sequelize.STRING,
    },
    ilv_cross_one_max: {
        type: Sequelize.BIGINT,
    },
    ilv_cross_one_max_win: {
        type: Sequelize.BIGINT,
    },
    ilv_cross_min_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_cross_max_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_cross_max_win: {
        type: Sequelize.DATE,
    },
    ilv_special_one_max: {
        type: Sequelize.DATE,
    },
    ilv_special_one_max_win: {
        type: Sequelize.STRING,
    },
    ilv_special_min_bet: {
        type: Sequelize.STRING,
    },
    ilv_special_max_bet: {
        type: Sequelize.STRING,
    },
    ilv_special_max_win: {
        type: Sequelize.STRING,
    },
    ilv_realtime_one_max: {
        type: Sequelize.STRING,
    },
    ilv_realtime_one_max_win: {
        type: Sequelize.STRING,
    },
    ilv_realtime_min_bet: {
        type: Sequelize.TEXT,
    },
    ilv_realtime_max_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_realtime_max_win: {
        type: Sequelize.BIGINT,
    },
    ilv_minigame_one_max: {
        type: Sequelize.BIGINT,
    },
    ilv_minigame_one_max_win: {
        type: Sequelize.BIGINT,
    },
    ilv_minigame_min_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_minigame_max_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_minigame_max_win: {
        type: Sequelize.BIGINT,
    },
    ilv_empty_one_max: {
        type: Sequelize.BIGINT,
    },
    ilv_empty_one_max_win: {
        type: Sequelize.BIGINT,
    },
    ilv_empty_min_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_empty_max_bet: {
        type: Sequelize.BIGINT,
    },
    ilv_empty_max_win: {
        type: Sequelize.BIGINT,
    },
    ilv_lose_bonus: {
        type: Sequelize.BIGINT,
    },
    ilv_rec_lose_bonus: {
        type: Sequelize.BIGINT,
    },
    min_folder: {
        type: Sequelize.BIGINT,
    },
    bank_allow: {
        type: Sequelize.TINYINT,
    },
    gwallet_allow: {
        type: Sequelize.TINYINT,
    },
    shopcoin_allow: {
        type: Sequelize.TINYINT,
    },
    bank_withdraw: {
        type: Sequelize.TINYINT,
    },
    treecoin_allow: {
        type: Sequelize.TINYINT,
    },
    bcoin_allow: {
        type: Sequelize.TINYINT,
    },

}, {
    // options
    timestamps: false
});

// temp.removeAttribute('createdAt');
// temp.removeAttribute('updatedAt');

module.exports = temp;