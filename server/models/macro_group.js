const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('macro_group', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    group_name: {
        type: Sequelize.TEXT,
    },
    group_status: {
        type: Sequelize.TINYINT,
    },
    group_sorting: {
        type: Sequelize.TINYINT,
    },
}, {
    timestamps: false
    // options
});


module.exports = temp;