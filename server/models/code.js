const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Code = db.define('info_code', {
    // attributes
    icd_idx : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    icd_agent: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    icd_name: {
        type: Sequelize.STRING ,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    icd_code: {
        type: Sequelize.STRING ,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    icd_status : {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    icd_reg_datetime: {
        type: Sequelize.DATE,
        validate : {
            allowNull: true
        }
    },
    icd_reg_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    icd_action: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    status: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

Code.removeAttribute('createdAt');
Code.removeAttribute('updatedAt');

module.exports = Code;