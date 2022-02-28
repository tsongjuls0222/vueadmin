const Sequelize = require('sequelize');
const db = require('../db_config.js');
const User = db.define('info_user_charget_bonusset', {
    // attributes
    num: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            allowNull: false
        }
    },
    charget_next_min: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    one_max_caninput: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    eday_input_bonus_cond: {
        type: Sequelize.INTEGER,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_cond: {
        type: Sequelize.STRING,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_1: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_2: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_3: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_4: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_5: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_6: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_7: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_8: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_9: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_level_10: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_partner1: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_partner2: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_partner3: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_partner4: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_partner5: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_1: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_2: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_3: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_4: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_5: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_6: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_7: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_8: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_9: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_level_10: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_partner1: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_partner2: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_partner3: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_partner4: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    each_input_bonus_partner5: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    first_input_bonus_new: {
        type: Sequelize.DECIMAL,
        validate: {
            allowNull: true
        }
    },
    sudden_bonus_date_from: {
        type: Sequelize.DATE,
        validate: {
            allowNull: true
        }
    },
    sudden_bonus_date_to: {
        type: Sequelize.DATE,
        validate: {
            allowNull: true
        }
    },
    sudden_event: {
        type: Sequelize.DATE,
        validate: {
            allowNull: true
        }
    },
    sudden_event_unlimited: {
        type: Sequelize.TINYINT,
        validate: {
            allowNull: true
        }
    },
    dev_note: {
        type: Sequelize.STRING,
        validate: {
            allowNull: true
        }
    },
    time_loop: {
        type: Sequelize.TIME,
        validate: {
            allowNull: true
        }
    },
}, {
    // options
});

User.removeAttribute('createdAt');
User.removeAttribute('updatedAt');

module.exports = User;