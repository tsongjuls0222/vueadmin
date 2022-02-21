const Sequelize = require('sequelize');
const db = require('../db_config.js');
const BankList = db.define('bank_list', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate : {
            allowNull: false
        }
    },
    bank_name: {
        type: Sequelize.STRING(255),
        validate : {
            allowNull: true
        }
    },
    bank_image: {
        type: Sequelize.STRING(255),
        validate : {
            allowNull: true
        }
    },
    bank_status: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

BankList.removeAttribute('createdAt');
BankList.removeAttribute('updatedAt');

module.exports = BankList;