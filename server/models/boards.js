const Sequelize = require('sequelize');
const db = require('../db_config.js');
const temp = db.define('info_board', {
    // attributes
    ibd_idx  : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        validate : {
            allowNull: false
        }
    },
    ibd_fix : {
        type: Sequelize.INTEGER,
        rimaryKey: true,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_type : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_title   : {
        type: Sequelize.STRING,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_contents   : {
        type: Sequelize.TEXT,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_writer  : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_view_count  : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_status  : {
        type: Sequelize.INTEGER,
        unique: true,
        validate : {
            allowNull: true
        }
    },
    ibd_reg_datetime  : {
        type: Sequelize.DATE,
        validate : {
            allowNull: true
        }
    },
    ibd_modified  : {
        type: Sequelize.DATE,
        validate : {
            allowNull: true
        }
    },
    ibd_ip  : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ibd_update_ip  : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ibd_color  : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ibd_titlecolor  : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ibd_fontsize  : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ibd_fontweight  : {
        type: Sequelize.STRING,
        validate : {
            allowNull: true
        }
    },
    ibd_thumbnail  : {
        type: Sequelize.TEXT,
        validate : {
            allowNull: true
        }
    },
    target_level  : {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    sort_julius  : {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    },
    form_group  : {
        type: Sequelize.INTEGER,
        validate : {
            allowNull: true
        }
    }
}, {
    // options
});

temp.removeAttribute('createdAt');
temp.removeAttribute('updatedAt');

module.exports = temp;