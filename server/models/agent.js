const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_agent', {
    // attributes
    ia_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ia_master: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ia_bonsa: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ia_bubonsa: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ia_chongpan: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ia_parent: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ia_code: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ia_account: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ia_name: {
        type: Sequelize.STRING,
        validate : {
            allowNull: false
        }
    },
    ia_password: {
        type: Sequelize.STRING,
        validate : {
            allowNull: false
        }
    },
    ia_balance: {
        type: Sequelize.BIGINT,
        validate : {
            allowNull: true
        }
    },
    ia_fee: {
        type: Sequelize.BIGINT,
        validate : {
            allowNull: true
        }
    },
    ia_level: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: false
        }
    },
    ia_phone: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_email: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_type: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_loosing: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    ia_rate: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_status: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: false
        }
    },
    ia_reg: {
        type: Sequelize.DATE,
        validate : {
            allowNull: false
        }
    },
    ia_last_login: {
        type: Sequelize.DATE,
        validate : {
            allowNull: true
        }
    },
    ia_reg_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: false
        }
    },
    ia_last_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_key: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_action: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    ia_partnertype: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ia_prematch: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    ia_minigame: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    ia_casino: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    status: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    allowChildren: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    maxChildren: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    agent_memo: {
        type: Sequelize.STRING(1234) ,
        validate : {
            allowNull: true
        }
    },
    viewingOnly: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    blastPoints: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    pointsLimit: {
        type: Sequelize.BIGINT,
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