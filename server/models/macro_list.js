const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('macro_list', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    macro_name: {
        type: Sequelize.TEXT,
    },
    macro_status: {
        type: Sequelize.TINYINT,
    },
    macro_sorting: {
        type: Sequelize.TINYINT,
    },
    macro_type: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false
    // options
});


module.exports = temp;