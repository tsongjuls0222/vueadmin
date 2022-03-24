const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('minigame_odds_list', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    game_id: {
        type: Sequelize.INTEGER,
    },
    market_id: {
        type: Sequelize.STRING,
    },
    market_col_id: {
        type: Sequelize.STRING,
    },
    first_odd: {
        type: Sequelize.STRING,
    },
    second_odd: {
        type: Sequelize.INTEGER,
    },
    data_center: {
        type: Sequelize.STRING,
    },
    extra_market: {
        type: Sequelize.TEXT,
    },
    first_title: {
        type: Sequelize.STRING,
    },
    second_title: {
        type: Sequelize.INTEGER,
    },
}, {
    // options
    timestamps: false
});

// User.removeAttribute('createdAt');
// User.removeAttribute('updatedAt');

module.exports = User;