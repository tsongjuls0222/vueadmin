const Sequelize = require('sequelize');
const db = require('../db_config.js');
const BankList = db.define('bank_list', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bank_name: {
        type: Sequelize.STRING(255),
    },
    bank_image: {
        type: Sequelize.STRING(255),
    },
    bank_status: {
        type: Sequelize.INTEGER,
    }
}, {
    // options
    timestamps: false
});

// BankList.removeAttribute('createdAt');
// BankList.removeAttribute('updatedAt');

module.exports = BankList;