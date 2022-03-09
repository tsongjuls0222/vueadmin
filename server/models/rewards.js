const Sequelize = require('sequelize');
const db = require('../db_config.js');
const BankList = db.define('rewards', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lvl1_ds: {
        type: Sequelize.BIGINT,
    },
    lvl1_seven: {
        type: Sequelize.BIGINT,
    },
    lvl1_fifteen: {
        type: Sequelize.BIGINT,
    },
    lvl1_thirty: {
        type: Sequelize.BIGINT,
    },
    lvl2_ds: {
        type: Sequelize.BIGINT,
    },
    lvl2_seven: {
        type: Sequelize.BIGINT,
    },
    lvl2_fifteen: {
        type: Sequelize.BIGINT,
    },
    lvl2_thirty: {
        type: Sequelize.BIGINT,
    },
    lvl3_ds: {
        type: Sequelize.BIGINT,
    },
    lvl3_seven: {
        type: Sequelize.BIGINT,
    },
    lvl3_fifteen: {
        type: Sequelize.BIGINT,
    },
    lvl3_thirty: {
        type: Sequelize.BIGINT,
    },
}, {
    timestamps: false
});

module.exports = BankList;