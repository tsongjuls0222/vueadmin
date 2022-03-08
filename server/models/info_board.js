const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('info_board', {
    // attributes
    ibd_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    ibd_fix: {
        type: Sequelize.INTEGER,
        rimaryKey: true,
        unique: true,
    },
    ibd_type: {
        type: Sequelize.STRING,
        unique: true,
    },
    ibd_title: {
        type: Sequelize.STRING,
        unique: true,
    },
    ibd_contents: {
        type: Sequelize.TEXT,
        unique: true,
    },
    ibd_writer: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ibd_view_count: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ibd_status: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    ibd_reg_datetime: {
        type: Sequelize.DATE,
    },
    ibd_modified: {
        type: Sequelize.DATE,
    },
    ibd_ip: {
        type: Sequelize.STRING,
    },
    ibd_update_ip: {
        type: Sequelize.STRING,
    },
    ibd_color: {
        type: Sequelize.STRING,
    },
    ibd_titlecolor: {
        type: Sequelize.STRING,
    },
    ibd_fontsize: {
        type: Sequelize.STRING,
    },
    ibd_fontweight: {
        type: Sequelize.STRING,
    },
    ibd_thumbnail: {
        type: Sequelize.TEXT,
    },
    target_level: {
        type: Sequelize.INTEGER,
    },
    sort_julius: {
        type: Sequelize.INTEGER,
    },

}, {
    // options
    timestamps: false
});

// temp.removeAttribute('createdAt');
// temp.removeAttribute('updatedAt');

module.exports = temp;