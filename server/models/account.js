const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_account', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    iac_agent: {
        type: Sequelize.INTEGER,
    },
    iac_name: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    iac_status: {
        type: Sequelize.INTEGER,
    },
    iac_ip: {
        type: Sequelize.STRING,
    },
    iac_reg_datetime: {
        type: Sequelize.DATE,
    },
    iac_reg_ip: {
        type: Sequelize.STRING,
    },
    iac_action: {
        type: Sequelize.INTEGER,
    },
    istopmanager: {
        type: Sequelize.INTEGER,
    },
    iac_online: {
        type: Sequelize.INTEGER,
    }
}, {
    // options
    timestamps: false
});

// User.removeAttribute('createdAt');
// User.removeAttribute('updatedAt');

module.exports = User;