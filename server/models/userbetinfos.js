const Sequelize = require('sequelize');
const db = require('../db_config.js');
const UserBetListInfo = db.define('user_bet_infos', {
    // attributes
    it_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    it_key : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    it_spc: {
        type: Sequelize.STRING,
        validate : {
            allowNull: false
        }
    },
    it_type: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    it_proceed : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    it_reason : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_target: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_amount: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    it_point: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_bonus_type: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_status: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_reg_ip: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_update_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    it_reg_date: {
        type: Sequelize.DATEONLY,
        validate : {
            allowNull: true
        }
    },
    it_reg_datetime : {
        type: Sequelize.DATE,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_update_datetime: {
        type: Sequelize.DATE,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_before_balance: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_after_balance: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_before_point: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_after_point: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    it_action: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    it_handelmanager: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    it_manager_no: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    it_has_error: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    notification: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    sound: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    it_expiry: {
        type: Sequelize.DATEONLY,
        validate : {
            allowNull: true
        }
    },
    popup_noti: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    gwallet_data: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    gwallet_sent: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    coinType: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    gwallet_ref: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    gwallet_extra_data: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    gwallet_txid: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    casino_name: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    sudden_bonus: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    bonus_type: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    playingtype: {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

UserBetListInfo.removeAttribute('createdAt');
UserBetListInfo.removeAttribute('updatedAt');

module.exports = UserBetListInfo;