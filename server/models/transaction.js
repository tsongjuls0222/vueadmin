const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Transaction = db.define('info_transaction', {
    // attributes
    it_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    it_key : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    it_spc: {
        type: Sequelize.STRING,
        validate : {
            notEmpty: false
        }
    },
    it_type: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    it_proceed : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    it_reason : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_target: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_amount: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty: false
        }
    },
    it_point: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_bonus_type: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_status: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_reg_ip: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_update_ip: {
        type: Sequelize.STRING,
        validate : {
            notEmpty: true
        }
    },
    it_reg_date: {
        type: Sequelize.DATEONLY,
        validate : {
            notEmpty: true
        }
    },
    it_reg_datetime : {
        type: Sequelize.DATE,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_update_datetime: {
        type: Sequelize.DATE,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_before_balance: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_after_balance: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_before_point: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_after_point: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    it_action: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty: true
        }
    },
    it_handelmanager: {
        type: Sequelize.STRING,
        validate : {
            notEmpty: true
        }
    },
    it_manager_no: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty: true
        }
    },
    it_has_error: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty: true
        }
    },
    notification: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    sound: {
        type: Sequelize.STRING,
        validate : {
            notEmpty: true
        }
    },
    it_expiry: {
        type: Sequelize.DATEONLY,
        validate : {
            notEmpty: true
        }
    },
    popup_noti: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    gwallet_data: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    },
    gwallet_sent: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    },
    coinType: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    },
    gwallet_ref: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty: true
        }
    },
    gwallet_extra_data: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    },
    gwallet_txid: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    },
    casino_name: {
        type: Sequelize.STRING,
        validate : {
            notEmpty: true
        }
    },
    sudden_bonus: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty: true
        }
    },
    bonus_type: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    },
    playingtype: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
    }
}, {
    // options
    timestamps: false
});

Transaction.removeAttribute('createdAt');
Transaction.removeAttribute('updatedAt');

module.exports = Transaction;