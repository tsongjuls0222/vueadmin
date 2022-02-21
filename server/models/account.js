const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_account', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate : {
            allowNull: false
        }
    },
    iac_agent: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    iac_name: {
        type: Sequelize.STRING ,
        validate : {
            allowNull: true
        }
    },
    username: {
        type: Sequelize.STRING ,
        validate : {
            allowNull: true
        }
    },
    password: {
        type: Sequelize.STRING ,
        validate : {
            allowNull: true
        }
    },
    iac_status: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    iac_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    iac_reg_datetime: {
        type: Sequelize.DATE,
        validate : {
            allowNull: true
        }
    },
    iac_reg_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    iac_action: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    istopmanager: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    iac_online: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

User.removeAttribute('createdAt');
User.removeAttribute('updatedAt');

module.exports = User;