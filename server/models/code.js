const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Code = db.define('info_code', {
    // attributes
    icd_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    icd_agent: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    icd_name: {
        type: Sequelize.STRING,
        unique: true,
    },
    icd_code: {
        type: Sequelize.STRING,
        unique: true,
    },
    icd_status: {
        type: Sequelize.INTEGER,
    },
    icd_reg_datetime: {
        type: Sequelize.DATE,
    },
    icd_reg_ip: {
        type: Sequelize.STRING,
    },
    icd_action: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.INTEGER,
    }
}, {
    // options
    timestamps: false
});

// Code.removeAttribute('createdAt');
// Code.removeAttribute('updatedAt');

module.exports = Code;