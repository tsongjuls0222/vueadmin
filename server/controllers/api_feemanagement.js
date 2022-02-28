const db = require('../db_config.js');
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
}