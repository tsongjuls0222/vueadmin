const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_fee', {
    // attributes
    if_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            allowNull: false
        }
    },
    if_user: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    if_partner: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    if_amount: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    if_info: {
        type: Sequelize.STRING,
        validate: {
            allowNull: true
        }
    },
    if_bet_idx: {
        type: Sequelize.STRING,
        validate: {
            allowNull: true
        }
    },
    if_fee: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    if_datetime: {
        type: Sequelize.DATE,
        validate: {
            allowNull: true
        }
    },
    if_before: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    if_after: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
}, {
    // options
});

User.removeAttribute('createdAt');
User.removeAttribute('updatedAt');

module.exports = User;