const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_user', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    iu_partner: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_rec: {
        type: Sequelize.INTEGER,
    },
    iu_timer: {
        type: Sequelize.INTEGER,
    },
    iu_odds: {
        type: Sequelize.INTEGER,
    },
    iu_email: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    iu_level: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_bank: {
        type: Sequelize.INTEGER,
    },
    iu_acc: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_name: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_nickname: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_phone: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_rolling: {
        type: Sequelize.STRING,
    },
    iu_balance: {
        type: Sequelize.BIGINT,
    },
    iu_point: {
        type: Sequelize.INTEGER,
    },
    iu_type: {
        type: Sequelize.STRING,
        unique: true,
    },
    iu_last_login: {
        type: Sequelize.DATE,
    },
    iu_reg_date: {
        type: Sequelize.DATEONLY,
    },
    iu_reg_datetime: {
        type: Sequelize.DATE,
    },
    iu_status: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    iu_memo: {
        type: Sequelize.TEXT,
    },
    iu_access_ip: {
        type: Sequelize.STRING,
    },
    iu_access_key: {
        type: Sequelize.STRING,
    },
    iu_reg_domain: {
        type: Sequelize.STRING,
    },
    iu_last_ip: {
        type: Sequelize.STRING,
    },
    iu_reg_ip: {
        type: Sequelize.STRING,
    },
    admin: {
        type: Sequelize.STRING,
    },
    remember_token: {
        type: Sequelize.STRING,
    },
    iu_action: {
        type: Sequelize.INTEGER,
    },
    session_id: {
        type: Sequelize.STRING,
    },
    iu_casino_account: {
        type: Sequelize.STRING,
    },
    iu_memtype: {
        type: Sequelize.STRING,
        unique: true,
    },
    walletAddress: {
        type: Sequelize.STRING,
    },
    iu_access: {
        type: Sequelize.STRING,
    },
    iu_online: {
        type: Sequelize.BIGINT,
    },
    iu_wpass: {
        type: Sequelize.TEXT,
    },
    block: {
        type: Sequelize.INTEGER,
    },
    iu_recommend: {
        type: Sequelize.STRING,
    },
    deposit_level: {
        type: Sequelize.INTEGER,
    },
    deposit_total: {
        type: Sequelize.BIGINT,
    },
    casino_account: {
        type: Sequelize.INTEGER,
    },
    stamp: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    iu_adminnotif: {
        type: Sequelize.INTEGER,
    },
    walletAddress_2: {
        type: Sequelize.STRING,
    },
    notification: {
        type: Sequelize.INTEGER,
    },
    iu_oneVone: {
        type: Sequelize.INTEGER,
    },
    iu_evolution: {
        type: Sequelize.BIGINT,
    },
    iu_micro: {
        type: Sequelize.BIGINT,
    },
    iu_dream: {
        type: Sequelize.BIGINT,
    },
    iu_vivo: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    iu_pragmatic: {
        type: Sequelize.BIGINT,
    },
    iu_qtslot: {
        type: Sequelize.BIGINT,
    },
    iu_fgslot: {
        type: Sequelize.BIGINT,
    },
    iu_mdslot: {
        type: Sequelize.BIGINT,
    },
    iu_microslot: {
        type: Sequelize.BIGINT,
    },
    iu_cq9slot: {
        type: Sequelize.BIGINT,
    },
    iu_custom_prematch_eu: {
        type: Sequelize.INTEGER,
    },
    iu_custom_prematch_kor: {
        type: Sequelize.INTEGER,
    },
    iu_custom_live: {
        type: Sequelize.INTEGER,
    },
    iu_custom_minigame: {
        type: Sequelize.INTEGER,
    },
    iu_custom_casino: {
        type: Sequelize.INTEGER,
    },
    iu_custom_slot: {
        type: Sequelize.INTEGER,
    },
    iu_min_bet: {
        type: Sequelize.BIGINT,
    },
    iu_max_bet: {
        type: Sequelize.BIGINT,
    },
    iu_max_win: {
        type: Sequelize.BIGINT,
    },
    iu_min_bet_prematch_kor: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    iu_max_bet_prematch_kor: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    iu_max_win_prematch_kor: {
        type: Sequelize.BIGINT,
    },
    iu_min_bet_live: {
        type: Sequelize.BIGINT,
    },
    iu_max_bet_live: {
        type: Sequelize.BIGINT,
    },
    iu_max_win_live: {
        type: Sequelize.BIGINT,
    },
    iu_min_bet_minigame: {
        type: Sequelize.BIGINT,
    },
    iu_max_bet_minigame: {
        type: Sequelize.BIGINT,
    },
    iu_max_win_minigame: {
        type: Sequelize.BIGINT,
    },
    iu_min_casino: {
        type: Sequelize.BIGINT,
    },
    iu_max_casino: {
        type: Sequelize.BIGINT,
        unique: true,
    },
    iu_min_slot: {
        type: Sequelize.BIGINT,
    },
    iu_max_slot: {
        type: Sequelize.DATEONLY,
    },
    block_prematcheu: {
        type: Sequelize.INTEGER,
    },
    block_prematchkor: {
        type: Sequelize.INTEGER,
    },
    block_live: {
        type: Sequelize.INTEGER,
    },
    block_minigame: {
        type: Sequelize.INTEGER,
    },
    block_casino: {
        type: Sequelize.INTEGER,
    },
    block_slot: {
        type: Sequelize.INTEGER,
    },
    shopCoin: {
        type: Sequelize.INTEGER,
    },
    real_code: {
        type: Sequelize.STRING,
    },
    partner_balance: {
        type: Sequelize.BIGINT,
    },
    iu_asia: {
        type: Sequelize.BIGINT,
    },
    remember_token: {
        type: Sequelize.STRING,
    },
    iu_gameplay: {
        type: Sequelize.BIGINT,
    },
    iu_sexybaca: {
        type: Sequelize.BIGINT,
    },
    minfolder_eu: {
        type: Sequelize.INTEGER,
    },
    minfolder_kr: {
        type: Sequelize.INTEGER,
    },
    minfolder_live: {
        type: Sequelize.INTEGER,
    },
    update_datetime: {
        type: Sequelize.DATE,
    },
    casino_update: {
        type: Sequelize.DATE,
    },
    login_country: {
        type: Sequelize.STRING,
    },
    under_surveillance: {
        type: Sequelize.INTEGER,
    },
    BCoin: {
        type: Sequelize.INTEGER,
    },
    BCoin_details: {
        type: Sequelize.STRING,
    }
}, {
    // options
    timestamps: false
});



module.exports = User;