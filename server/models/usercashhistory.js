const Sequelize = require('sequelize');
const db = require('../db_config.js');
const UserCashHistory = db.define('user_cash_historylist', {
    // attributes
    num: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    mbno : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    cash_move_reason : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    cash_move_amouint: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty: false
        }
    },
    cash_before : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty: false
        }
    },
    cash_after : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty: true
        }
    },
    cash_move_type : {
        type: Sequelize.ENUM("입금", "출금"),
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    move_date : {
        type: Sequelize.DATE,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    ref_num : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    ref_code : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    isrealtime : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    gwallet: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty: true
        }
    },
    admin: {
        type: Sequelize.STRING,
        validate : {
            notEmpty: false
        }
    }
}, {
    // options
    timestamps: false
});


module.exports = UserCashHistory;