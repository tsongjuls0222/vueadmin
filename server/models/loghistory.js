const Sequelize = require('sequelize');
const db = require('../db_config.js');
const LogHistory = db.define('info_login_history', {
    // attributes
    ilh_idx : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ilh_member : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ilh_date : {
        type: Sequelize.DATEONLY,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ilh_datetime : {
        type: Sequelize.DATE,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ip_address: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    device: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

LogHistory.removeAttribute('createdAt');
LogHistory.removeAttribute('updatedAt');

module.exports = LogHistory;