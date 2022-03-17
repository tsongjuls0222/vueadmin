const Sequelize = require('sequelize');
const db = require('../db_config.js');
const BankList = db.define('maintenance', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    maintenance: {
        type: Sequelize.TINYINT,
    },
    page: {
        type: Sequelize.STRING,
    },
    page_kor: {
        type: Sequelize.STRING,
    }
}, {
    // options
    timestamps: false
});

// BankList.removeAttribute('createdAt');
// BankList.removeAttribute('updatedAt');

module.exports = BankList;