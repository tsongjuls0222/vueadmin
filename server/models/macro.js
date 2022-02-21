const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Macro = db.define('macro_group', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate : {
            allowNull: false
        }
    },
    group_name: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    group_status: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    group_sorting : {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

Macro.removeAttribute('createdAt');
Macro.removeAttribute('updatedAt');

module.exports = Macro;