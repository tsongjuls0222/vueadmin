const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('partner_claim_transfer_logs', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    from_agent: {
        type: Sequelize.INTEGER,
    },
    transfer_amount: {
        type: Sequelize.BIGINT,
    },
    agent_id: {
        type: Sequelize.INTEGER,
    },
    beforeBalance: {
        type: Sequelize.BIGINT,
    },
    afterBalance: {
        type: Sequelize.BIGINT,
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