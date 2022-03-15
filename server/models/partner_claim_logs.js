const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('partner_claim_logs', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    agent_id: {
        type: Sequelize.INTEGER,
    },
    amount: {
        type: Sequelize.INTEGER,
    },
    date_from: {
        type: Sequelize.DATE,
    },
    date_to: {
        type: Sequelize.DATE,
    },
    date_claim: {
        type: Sequelize.DATE,
    },
    logs_status: {
        type: Sequelize.TINYINT,
    },
    date_save: {
        type: Sequelize.DATE,
    },
}, {
    // options
    timestamps: false
});

// User.removeAttribute('createdAt');
// User.removeAttribute('updatedAt');

module.exports = User;