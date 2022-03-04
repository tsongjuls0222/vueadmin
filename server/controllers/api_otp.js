const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");

module.exports = class API {
    static async getOTP(req, res) {
        const requestFilter = req.body;
        const start = requestFilter.start;
        const keyword = requestFilter.keyword;
        const fromdate = requestFilter.fromDate + " 00:00:00";
        const todate = requestFilter.toDate + " 23:59:59";
        try {
            var cond = "";
            // if (agent != "-1") {
            //     cond += ` and a.if_partner = '${agent}'`
            // }

            if (keyword !== '') {
                cond += ` and a.mobile_number like '%${keyword}%' `
            }


            const myquery = `Select *,b.id as userid,a.id as otpid from otp_logs a left join (select a.real_code,
                a.iu_level,
                a.username,
                a.iu_nickname,
                a.iu_name,
                a.iu_recommend,
                a.iu_reg_ip,
                a.id,
                a.iu_memtype, b.ia_name, CONCAT('82', SUBSTRING(a.iu_phone, 4, 11)) as newphone, c.username as recommender from info_user as a left join info_agent as b on a.iu_partner = b.ia_idx left join info_user as c on a.iu_recommend = c.id) as b on a.mobile_number = newphone where (date_format(a.datetime, '%Y-%m-%d %H:%i:%s') >= '${fromdate}' and date_format(a.datetime, '%Y-%m-%d %H:%i:%s') <= '${todate}') ${cond} order by a.id desc limit ${start},50`;

            // const mycount = `Select count(a.id) as otpid from otp_logs a left join ( select a.id, b.ia_name, CONCAT('82', SUBSTRING(a.iu_phone, 4, 11)) as newphone, c.username as recommender from info_user as a left join info_agent as b on a.iu_partner = b.ia_idx left join info_user as c on a.iu_recommend = c.id) as b on a.mobile_number = newphone where (date_format(a.datetime, '%Y-%m-%d %H:%i:%s') >= '${fromdate}' and date_format(a.datetime, '%Y-%m-%d %H:%i:%s') <= '${todate}') ${cond}`;
            const getalldata = await db.query(myquery, {
                type: QueryTypes.SELECT
            });
            // const count = await db.query(mycount, {
            //     type: QueryTypes.SELECT
            // });

            res.status(200).json({
                data: getalldata,
                count: 4001
            });
            // res.status(200).json(myquery);
        } catch (error) {
            // res.status(200).json(requestFilter);
            res.status(404).json({ message: error.message });
        }
    }
    static async getCasino(req, res) {
        const requestFilter = req.body;
        const start = requestFilter.start;
        const keyword = requestFilter.keyword;
        const fromdate = requestFilter.fromDate + " 00:00:00";
        const todate = requestFilter.toDate + " 23:59:59";
        try {
            var cond = '';
            if (keyword !== '') {
                cond = `and b.username like'%${keyword}%'`;
            }

            const myquery = `Select * from info_transaction as a inner join info_user as b on a.it_target=b.id left join info_agent as c on b.iu_partner=c.ia_idx where (date_format(a.it_update_datetime, '%Y-%m-%d %H:%i:%s') >= '${fromdate}' and date_format(a.it_update_datetime, '%Y-%m-%d %H:%i:%s') <= '${todate}') ${cond} and a.it_reason IN ('CASINO WITHDRAW', 'CASINO DEPOSIT') order by id desc limit ${start},50`;
            const mycount = `Select count(a.it_idx) as counter from info_transaction as a inner join info_user as b on a.it_target=b.id left join info_agent as c on b.iu_partner=c.ia_idx where (date_format(a.it_update_datetime, '%Y-%m-%d %H:%i:%s') >= '${fromdate}' and date_format(a.it_update_datetime, '%Y-%m-%d %H:%i:%s') <= '${todate}') ${cond} and a.it_reason IN ('CASINO WITHDRAW', 'CASINO DEPOSIT')`;

            const getalldata = await db.query(myquery, {
                type: QueryTypes.SELECT
            });
            const count = await db.query(mycount, {
                type: QueryTypes.SELECT
            });

            res.status(200).json({
                data: getalldata,
                count: count
            });
        } catch (error) {
            res.status(404).json(error);
        }
    }
}