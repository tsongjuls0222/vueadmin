const db = require('../db_config.js');
const Bonus = require('../models/chargeset_bonus.js');
const Config = require('../models/info_config.js');
const Daily = require('../models/info_user_withdrawal_set.js');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const date = require('date-and-time');
const now = new Date();
const dtvalue = date.format(now, 'YYYY-MM-DD');
let to = dtvalue + " 23:59:59";

module.exports = class API {
    static async getFeelogs(req, res) {
        try {
            var currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() - 10);
            let current = date.format(currentDate, 'YYYY-MM-DD') + " 00:00:00";

            const myquery = `Select  a.*, c.username, c.iu_nickname, b.ia_name
            from info_fee as a
            left join info_agent as b on a.if_partner=b.ia_idx
            left join info_user as c on a.if_user=c.id
            where (date_format(a.if_datetime, '%Y-%m-%d %H:%i:%s') >= '${current}' and date_format(a.if_datetime, '%Y-%m-%d %H:%i:%s') <= '${to}')
            order by a.if_idx desc limit 0 , 20`;

            const getalldata = await db.query(myquery, {
                type: QueryTypes.SELECT
            });
            res.status(200).json(getalldata);
            // res.status(200).json(myquery);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getFilterFeelogs(req, res) {
        const requestFilter = req.body;
        const agent = requestFilter.agent;
        const keyword = requestFilter.keyword;
        const fromdate = requestFilter.fromdate + " 00:00:00";
        const todate = requestFilter.todate + " 23:59:59";
        try {
            var cond = "";
            if (agent != "-1") {
                cond += ` and a.if_partner = '${agent}'`
            }

            if (keyword !== '') {
                cond += ` and (c.username like '%${keyword}%' or c.iu_nickname like '%${keyword}%' or b.ia_name like '%${keyword}%' )`
            }


            const myquery = `Select  a.*, c.username, c.iu_nickname, b.ia_name
            from info_fee as a
            left join info_agent as b on a.if_partner=b.ia_idx
            left join info_user as c on a.if_user=c.id
            where (date_format(a.if_datetime, '%Y-%m-%d %H:%i:%s') >= '${fromdate}' and date_format(a.if_datetime, '%Y-%m-%d %H:%i:%s') <= '${todate}') ${cond}
            order by a.if_idx desc limit 0 , 20`;
            const getalldata = await db.query(myquery, {
                type: QueryTypes.SELECT
            });
            res.status(200).json(getalldata);
            // res.status(200).json(myquery);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getBonus(req, res) {
        const id = req.params.id;
        try {
            const bonuset = await Bonus.findAll({
                where: {
                    num: id
                },
            });
            res.status(200).json(bonuset);
            // res.status(200).json(bonuset);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getConfig(req, res) {
        const id = req.params.id;
        try {
            const configset = await Config.findAll({
                where: {
                    icg_idx: id
                },
            });
            res.status(200).json(configset);
            // res.status(200).json(bonuset);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getBurstConfig(req, res) {
        const id = req.params.id;
        try {
            const configset = await Config.findAll({
                where: {
                    icg_idx: id
                },
                attributes: ['icg_idx', 'icg_sudden_max_bonus', 'icg_sudden_max_bonus_tuesday', 'icg_sudden_max_bonus_wednesday', 'icg_sudden_max_bonus_thursday', 'icg_sudden_max_bonus_friday', 'icg_sudden_max_bonus_saturday', 'icg_sudden_max_bonus_sunday', 'icg_casino_payback_bonus', 'icg_payback_max_bonus', 'icg_recommender_payback_bonus']
            });
            res.status(200).json(configset);
            // res.status(200).json(bonuset);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async setBonus(req, res) {
        const num = req.body.num
        const body = req.body;
        // const num = req.params.id;
        // const first_input_bonus_level_1 = body.first_input_bonus_level_1;
        try {
            const bonusset = await Bonus.update(
                {
                    first_input_bonus_level_1: body.first_input_bonus_level_1,
                    first_input_bonus_level_2: body.first_input_bonus_level_2,
                    first_input_bonus_level_3: body.first_input_bonus_level_3,
                    first_input_bonus_level_4: body.first_input_bonus_level_4,
                    first_input_bonus_level_5: body.first_input_bonus_level_5,
                    first_input_bonus_level_6: body.first_input_bonus_level_6,
                    first_input_bonus_level_7: body.first_input_bonus_level_7,
                    first_input_bonus_level_8: body.first_input_bonus_level_8,
                    first_input_bonus_level_9: body.first_input_bonus_level_9,
                    first_input_bonus_level_10: body.first_input_bonus_level_10,
                    each_input_bonus_level_1: body.each_input_bonus_level_1,
                    each_input_bonus_level_2: body.each_input_bonus_level_2,
                    each_input_bonus_level_3: body.each_input_bonus_level_3,
                    each_input_bonus_level_4: body.each_input_bonus_level_4,
                    each_input_bonus_level_5: body.each_input_bonus_level_5,
                    each_input_bonus_level_6: body.each_input_bonus_level_6,
                    each_input_bonus_level_7: body.each_input_bonus_level_7,
                    each_input_bonus_level_8: body.each_input_bonus_level_8,
                    each_input_bonus_level_9: body.each_input_bonus_level_9,
                    each_input_bonus_level_10: body.each_input_bonus_level_10,
                    eday_input_bonus_cond: body.eday_input_bonus_cond,
                },
                {
                    where: {
                        num
                    }
                }
            );
            res.status(200).json(bonusset);
        } catch (error) {
            res.json({
                message: error//"Cannot Change bonus 1",
            });
        }
    }
    static async setBurst(req, res) {
        const num = req.body.num
        const body = req.body;
        // const num = req.params.id;
        // const first_input_bonus_level_1 = body.first_input_bonus_level_1;
        try {
            const bonusset = await Bonus.update(
                {
                    first_input_bonus_level_1: body.first_input_bonus_level_1,
                    first_input_bonus_level_2: body.first_input_bonus_level_2,
                    first_input_bonus_level_3: body.first_input_bonus_level_3,
                    first_input_bonus_level_4: body.first_input_bonus_level_4,
                    first_input_bonus_level_5: body.first_input_bonus_level_5,
                    first_input_bonus_level_6: body.first_input_bonus_level_6,
                    first_input_bonus_level_7: body.first_input_bonus_level_7,
                    first_input_bonus_level_8: body.first_input_bonus_level_8,
                    first_input_bonus_level_9: body.first_input_bonus_level_9,
                    first_input_bonus_level_10: body.first_input_bonus_level_10,
                    sudden_bonus_date_from: body.sudden_bonus_date_from,
                    sudden_bonus_date_to: body.sudden_bonus_date_to,
                    sudden_event_unlimited: body.sudden_event_unlimited,
                    sudden_event: body.sudden_event
                },
                {
                    where: {
                        num
                    }
                }
            );
            // res.status(200).json(body);
        } catch (error) {
            res.json({
                message: error//"Cannot Change bonus 1",
            });
        }
    }
    static async setBurstConfig(req, res) {
        // const num = req.body.num
        const config = req.body.config;
        const burst = req.body.burst;
        const icg_idx = config.id;
        const num = burst.num;
        try {
            const temo = await Bonus.update(
                {
                    first_input_bonus_level_1: burst.first_input_bonus_level_1,
                    first_input_bonus_level_2: burst.first_input_bonus_level_2,
                    first_input_bonus_level_3: burst.first_input_bonus_level_3,
                    first_input_bonus_level_4: burst.first_input_bonus_level_4,
                    first_input_bonus_level_5: burst.first_input_bonus_level_5,
                    first_input_bonus_level_6: burst.first_input_bonus_level_6,
                    first_input_bonus_level_7: burst.first_input_bonus_level_7,
                    first_input_bonus_level_8: burst.first_input_bonus_level_8,
                    first_input_bonus_level_9: burst.first_input_bonus_level_9,
                    first_input_bonus_level_10: burst.first_input_bonus_level_10,
                    sudden_bonus_date_from: burst.sudden_bonus_date_from,
                    sudden_bonus_date_to: burst.sudden_bonus_date_to,
                    sudden_event_unlimited: burst.sudden_event_unlimited,
                    sudden_event: burst.sudden_event,
                    time_loop: burst.time_loop
                },
                {
                    where: {
                        num
                    }
                }
            );
            if (config.param == "icg_sudden_max_bonus") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_sudden_max_bonus_tuesday") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus_tuesday: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_sudden_max_bonus_wednesday") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus_wednesday: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_sudden_max_bonus_thursday") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus_thursday: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_sudden_max_bonus_friday") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus_friday: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_sudden_max_bonus_saturday") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus_saturday: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_sudden_max_bonus_sunday") {
                const bonus = await Config.update({
                    icg_sudden_max_bonus_sunday: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_casino_payback_bonus") {
                const bonus = await Config.update({
                    icg_casino_payback_bonus: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else if (config.param == "icg_payback_max_bonus") {
                const bonus = await Config.update({
                    icg_payback_max_bonus: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            else {
                const bonus = await Config.update({
                    icg_recommender_payback_bonus: config.value,
                }, {
                    where: {
                        icg_idx
                    }
                });
            }
            res.status(200).json(burst);
        } catch (error) {
            res.json({
                message: error//"Cannot Change bonus 1",
            });
        }
    }
    static async setConfig(req, res) {
        // const num = req.body.num
        const body = req.body;
        const icg_idx = body.icg_idx;
        try {
            const bonusset = await Config.update(
                {
                    icg_bonus_max: body.icg_bonus_max,
                    icg_tuesday_max_bonus: body.icg_tuesday_max_bonus,
                    icg_wednesday_max_bonus: body.icg_wednesday_max_bonus,
                    icg_thursday_max_bonus: body.icg_thursday_max_bonus,
                    icg_friday_max_bonus: body.icg_friday_max_bonus,
                    icg_saturday_max_bonus: body.icg_saturday_max_bonus,
                    icg_sunday_max_bonus: body.icg_sunday_max_bonus,
                },
                {
                    where: {
                        icg_idx
                    }
                }
            );
            // res.status(200).json(body);
        } catch (error) {
            res.json({
                message: error//"Cannot Change bonus 1",
            });
        }
    }
    static async setDaily(req, res) {
        const body = req.body;
        const num = body.num
        try {
            const temp = await Daily.update(
                {
                    available_time: body.available_time,
                    withdraw_next_hour: body.withdraw_next_hour,
                    withdraw_onetime: body.withdraw_onetime,
                    withdraw_oneday: body.withdraw_oneday,
                    withdraw_maxcnt: body.withdraw_maxcnt,
                },
                {
                    where: {
                        num
                    }
                },
            );
            // res.status(200).json(body);
            // res.status(200).json(bonuset);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getDaily(req, res) {
        try {
            const temp = await Daily.findAll({
                where: {
                    num: 1
                },
            });
            res.status(200).json(temp);
            // res.status(200).json(bonuset);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}