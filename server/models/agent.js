const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_agent', {
    // attributes
    ia_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    ia_master: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ia_bonsa: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ia_bubonsa: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ia_chongpan: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ia_parent: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ia_code: {
        type: Sequelize.STRING,
        unique: true,
    },
    ia_account: {
        type: Sequelize.STRING,
        unique: true,
    },
    ia_name: {
        type: Sequelize.STRING,
    },
    ia_password: {
        type: Sequelize.STRING,
    },
    ia_balance: {
        type: Sequelize.BIGINT,
    },
    ia_fee: {
        type: Sequelize.BIGINT,
    },
    ia_level: {
        type: Sequelize.INTEGER,
    },
    ia_phone: {
        type: Sequelize.STRING,
    },
    ia_email: {
        type: Sequelize.STRING,
    },
    ia_type: {
        type: Sequelize.STRING,
    },
    ia_loosing: {
        type: Sequelize.INTEGER,
    },
    ia_rate: {
        type: Sequelize.STRING,
    },
    ia_status: {
        type: Sequelize.INTEGER,
    },
    ia_reg: {
        type: Sequelize.DATE,
    },
    ia_last_login: {
        type: Sequelize.DATE,
    },
    ia_reg_ip: {
        type: Sequelize.STRING,
    },
    ia_last_ip: {
        type: Sequelize.STRING,
    },
    ia_key: {
        type: Sequelize.STRING,
    },
    ia_action: {
        type: Sequelize.INTEGER,
    },
    ia_partnertype: {
        type: Sequelize.STRING,
    },
    ia_prematch: {
        type: Sequelize.INTEGER,
    },
    ia_minigame: {
        type: Sequelize.INTEGER,
    },
    ia_casino: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    allowChildren: {
        type: Sequelize.INTEGER,
    },
    maxChildren: {
        type: Sequelize.INTEGER,
    },
    agent_memo: {
        type: Sequelize.STRING(1234),
    },
    viewingOnly: {
        type: Sequelize.INTEGER,
    },
    blastPoints: {
        type: Sequelize.INTEGER,
    },
    pointsLimit: {
        type: Sequelize.BIGINT,
    }
}, {
    // options
    timestamps: false
});

// User.removeAttribute('createdAt');
// User.removeAttribute('updatedAt');

module.exports = User;