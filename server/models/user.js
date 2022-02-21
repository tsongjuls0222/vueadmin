const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_user', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            notEmpty : false
        }
    },
    username:{
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : false
        }
    },
    password:{
        type: Sequelize.STRING,
        validate : {
            notEmpty : false
        }
    },
    iu_partner:{
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : false
        }
    },
    iu_rec: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_timer : {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_odds : {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_email: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_level : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_bank: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_acc: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_name: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_nickname : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_phone: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_rolling: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_balance : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_point: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_type: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_last_login: {
        type: Sequelize.DATE,
        validate : {
            notEmpty : true
        }
    },
    iu_reg_date: {
        type: Sequelize.DATEONLY,
        validate : {
            notEmpty : true
        }
    },
    iu_reg_datetime: {
        type: Sequelize.DATE,
        validate : {
            notEmpty : true
        }
    },
    iu_status: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_memo: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty : true
        }
    },
    iu_access_ip: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_access_key: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_reg_domain: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_last_ip: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_reg_ip: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    admin: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    remember_token: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_action: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    session_id:{
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_casino_account:{
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_memtype:{
        type: Sequelize.STRING,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    walletAddress: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_access : {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_online : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_wpass: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty : true
        }
    },
    block: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_recommend: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    deposit_level: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    deposit_total: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    casino_account : {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    stamp: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_adminnotif: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    walletAddress_2 : {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    notification: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_oneVone: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_evolution: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_micro: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_dream: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_vivo: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_pragmatic: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_qtslot: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_fgslot: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_mdslot: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_microslot: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_cq9slot: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_custom_prematch_eu: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_custom_prematch_kor: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_custom_live: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_custom_minigame:{
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_custom_casino:{
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_custom_slot:{
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    iu_min_bet: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_bet : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_win : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_min_bet_prematch_kor: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_max_bet_prematch_kor : {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_max_win_prematch_kor: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_min_bet_live: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_bet_live: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_win_live : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_min_bet_minigame: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_bet_minigame: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_win_minigame : {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_min_casino: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_casino: {
        type: Sequelize.BIGINT,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    iu_min_slot: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_max_slot: {
        type: Sequelize.DATEONLY,
        validate : {
            notEmpty : true
        }
    },
    block_prematcheu: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    block_prematchkor: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    block_live: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    block_minigame: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    block_casino: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    block_slot: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    shopCoin: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    real_code: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    partner_balance: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_asia: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    remember_token: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    iu_gameplay: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    iu_sexybaca: {
        type: Sequelize.BIGINT,
        validate : {
            notEmpty : true
        }
    },
    minfolder_eu: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    minfolder_kr: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    minfolder_live: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    update_datetime: {
        type: Sequelize.DATE,
        validate : {
            notEmpty : true
        }
    },
    casino_update: {
        type: Sequelize.DATE,
        validate : {
            notEmpty : true
        }
    },
    login_country: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    },
    under_surveillance: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    BCoin: {
        type: Sequelize.INTEGER,
        validate : {
            notEmpty : true
        }
    },
    BCoin_details: {
        type: Sequelize.STRING,
        validate : {
            notEmpty : true
        }
    }
}, {
    // options
    timestamps: false
});



module.exports = User;