const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");

module.exports = class API {
    static async getOTP(req, res) {
        // const requestFilter = req.body;
        // const agent = requestFilter.agent;
        // const keyword = requestFilter.keyword;
        // const fromdate = requestFilter.fromdate + " 00:00:00";
        // const todate = requestFilter.todate + " 23:59:59";
        try {
            // var cond = "";
            // if (agent != "-1") {
            //     cond += ` and a.if_partner = '${agent}'`
            // }

            // if (keyword !== '') {
            //     cond += ` and (c.username like '%${keyword}%' or c.iu_nickname like '%${keyword}%' or b.ia_name like '%${keyword}%' )`
            // }


            const myquery = `Select
                *,
                b.id as userid,
                a.id as otpid
            from
                otp_logs a
            left join (
                select
                    a.*,
                    b.ia_name,
                    CONCAT('82', SUBSTRING(a.iu_phone, 4, 11)) as newphone,
                    c.username as recommender
                from
                    info_user as a
                left join info_agent as b on
                    a.iu_partner = b.ia_idx
                left join info_user as c on
                    a.iu_recommend = c.id) as b on
                a.mobile_number = newphone
            order by
                a.id desc limit 50`;
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