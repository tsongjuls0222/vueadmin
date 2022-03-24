const Transaction = require("../models/transaction");
const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const date = require('date-and-time');
const Minigame = require('../models/minigame');
const Maintenance = require('../models/maintenance');
const { Op } = require("sequelize");

module.exports = class API {
    static async getminigamelist(req, res) {
        try {
            const result = await Minigame.findAll({ order: [['game_id', 'asc'], ['market_id', 'asc']] });
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getmaintenance(req, res) {
        try {
            const result = await Maintenance.findAll({ where: { id: { [Op.gt]: 8 } } });
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async addminigame(req, res) {
        const body = req.body;
        try {
            var msg = 'Added Successfully';
            var status = true;
            for (var index in body) {
                const game = body[index];
                if (game.game_id == 0 || game.market_id == 0) {
                    msg = "Select type of minigame or market";
                    status = false;
                    break;
                }
                if (game.extra_market.length < 1) {
                    if (game.first_title == '' || game.second_title == '' || game.first_odd == '' || game.second_odd == '' || game.data_center == '') {
                        msg = "Fields Cannot be empty";
                        status = false;
                        break;
                    }
                    if (game.first_odd < 0 || game.second_odd < 0 || game.data_center < 0) {
                        msg = "odds must be greater than 0";
                        status = false;
                        break;
                    }
                    // if (game.first_odd.match(/^\d+(\.\d+)?$/) || game.second_odd.match(/^\d+(\.\d+)?$/) || game.data_center.match(/^\d+(\.\d+)?$/)) {
                    //     msg = "odds can only accept numbers or decimals";
                    //     status = false;
                    //     break;
                    // }
                } else {
                    for (var extrakey in game.extra_market) {
                        const extra = game.extra_market[extrakey];
                        if (extra.homeTitle == '' || extra.homeTeam1 == '' || extra.homeOdds1 == '') {
                            msg = "Fields in subgame cannot be empty";
                            status = false;
                            break;
                        }
                        if (extra.homeTitle < 0 || extra.homeTeam1 < 0 || extra.homeOdds1 < 0) {
                            msg = "odds must be greater than 0";
                            status = false;
                            break;
                        }
                    }
                }
            }

            if (status) {
                for (var index in body) {
                    const game = body[index];
                    game.market_col_id = game.market_id + "_1"
                    game.first_odd = (game.first_odd == '') ? 0 : game.first_odd;
                    game.second_odd = (game.second_odd == '') ? 0 : game.second_odd;
                    game.data_center = (game.data_center == '') ? 0 : game.data_center;
                    game.first_title = (game.first_title == '') ? 0 : game.first_title;
                    game.second_title = (game.second_title == '') ? 0 : game.second_title;
                    var specialmarket = {};
                    for (var key in game.extra_market) {
                        const extra = game.extra_market[key];
                        var temp = {
                            marketid: game.market_id,
                            homeTitle: extra.homeTitle,
                            homeTeam1: extra.homeTeam1,
                            homeOdds1: extra.homeOdds1,
                            cell_id: game.market_id + '_1_' + key,
                        }
                        specialmarket[key] = temp;
                    }
                    game.extra_market = JSON.stringify(specialmarket);

                    const result = await Minigame.create(game);
                }
            }

            res.status(200).json({ message: msg, status: status });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async deleteminigame(req, res) {
        const id = req.params.id;
        try {
            const result = await Minigame.destroy({ where: { id: id } });
            res.status(200).json({ message: 'Successfully Deleted' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async saveminigame(req, res) {
        const game = req.body;
        try {
            var msg = 'Updated Successfully';
            var status = true;
            if (game.game_id == 0 || game.market_id == 0) {
                msg = "Select type of minigame or market";
                status = false;
            }
            if (game.extra_market.length < 1) {
                if (game.first_title == '' || game.second_title == '' || game.first_odd == '' || game.second_odd == '' || game.data_center == '') {
                    msg = "Fields Cannot be empty";
                    status = false;
                }
                if (game.first_odd < 0 || game.second_odd < 0 || game.data_center < 0) {
                    msg = "odds must be greater than 0";
                    status = false;
                }
                // if (game.first_odd.match(/^\d+(\.\d+)?$/) || game.second_odd.match(/^\d+(\.\d+)?$/) || game.data_center.match(/^\d+(\.\d+)?$/)) {
                //     msg = "odds can only accept numbers or decimals";
                //     status = false;
                //     break;
                // }
            } else {
                for (var extrakey in game.extra_market) {
                    const extra = game.extra_market[extrakey];
                    if (extra.homeTitle == '' || extra.homeTeam1 == '' || extra.homeOdds1 == '') {
                        msg = "Fields in subgame cannot be empty";
                        status = false;
                        break;
                    }
                    if (extra.homeTitle < 0 || extra.homeTeam1 < 0 || extra.homeOdds1 < 0) {
                        msg = "odds must be greater than 0";
                        status = false;
                        break;
                    }
                }
            }

            if (status) {
                game.market_col_id = game.market_id + "_1"
                game.first_odd = (game.first_odd == '') ? 0 : game.first_odd;
                game.second_odd = (game.second_odd == '') ? 0 : game.second_odd;
                game.data_center = (game.data_center == '') ? 0 : game.data_center;
                game.first_title = (game.first_title == '') ? 0 : game.first_title;
                game.second_title = (game.second_title == '') ? 0 : game.second_title;
                var specialmarket = {};
                for (var key in game.extra_market) {
                    const extra = game.extra_market[key];
                    var temp = {
                        marketid: game.market_id,
                        homeTitle: extra.homeTitle,
                        homeTeam1: extra.homeTeam1,
                        homeOdds1: extra.homeOdds1,
                        cell_id: game.market_id + '_1_' + key,
                    }
                    specialmarket[key] = temp;
                }
                var updateData = {
                    game_id: game.game_id,
                    market_id: game.market_id,
                    first_odd: (game.first_odd == '') ? 0 : game.first_odd,
                    second_odd: (game.second_odd == '') ? 0 : game.second_odd,
                    data_center: (game.data_center == '') ? 0 : game.data_center,
                    first_title: (game.first_title == '') ? 0 : game.first_title,
                    second_title: (game.second_title == '') ? 0 : game.second_title,
                    extra_market: JSON.stringify(specialmarket),
                }
                const result = await Minigame.update(updateData, { where: { id: game.id } });
                if (result == 0) {
                    msg = "No data updated!";
                }
            }

            res.status(200).json({ message: msg, status: status });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async deletesubgame(req, res) {
        const body = req.body;
        try {
            var result = await Minigame.findOne({ where: { id: body.id } });
            result = JSON.parse(result.extra_market);
            var specialmarket = {};
            var count = 0;
            for (var key in result) {
                if (key != body.subid) {
                    count++;
                    specialmarket[count] = result[key];
                }
            }
            var temp = JSON.stringify(specialmarket);
            const restemp = await Minigame.update({ extra_market: temp }, { where: { id: body.id } });
            res.status(200).json({ message: 'Subgame Deleted' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}