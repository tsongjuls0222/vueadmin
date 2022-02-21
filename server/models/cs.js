const Sequelize = require('sequelize');
const db = require('../db_config.js');
const Cs = db.define('info_cs', {
    // attributes
    ics_idx: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ics_title: {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ics_contents: {
        type: Sequelize.TEXT,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ics_writer : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ics_reply_contents : {
        type: Sequelize.STRING(1234),
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ics_status : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ics_view_count : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ics_admin_view: {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ics_reg_datetime: {
        type: Sequelize.DATE,
        validate : {
            allowNull: false
        }
    },
    ics_reg_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ics_update_datetime: {
        type: Sequelize.DATE,
        validate : {
            allowNull: true
        }
    },
    ics_update_ip: {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ics_action: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    req_type: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    notification: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    ics_attachment : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    deleted: {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

Cs.removeAttribute('createdAt');
Cs.removeAttribute('updatedAt');

module.exports = Cs;