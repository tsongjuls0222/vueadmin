const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_user_charget_bonusset', {
    // attributes
    num: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            allowNull: false
        }
    },
    charget_next_min: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    one_max_caninput: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    eday_input_bonus_cond: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_cond: {
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