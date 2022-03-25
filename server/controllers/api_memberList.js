const db = require('../db_config.js');
const Code = require("../models/code");
const Agent = require("../models/agent");
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const date = require('date-and-time');
const now = new Date();
const dtvalue = date.format(now, 'YYYY-MM-DD HH:mm:ss');

module.exports = class API {
    //fetch all posts
    static async fetchAllMemberList(req, res) {
        try {
            const quefinal = "Select DATEDIFF(NOW(), a.iu_last_login) as lastCount, b.ia_idx , b.ia_name, a.iu_recommend, a.username, a.iu_name, a.id, a.iu_status, a.real_code, a.iu_level, a.iu_memtype, a.iu_nickname, a.iu_phone, a.iu_balance, a.iu_point, a.iu_reg_ip, a.iu_last_ip, date_format(a.iu_last_login, '%Y-%m-%d %H:%i:%s') as iu_last_login, date_format(a.iu_reg_datetime, '%Y-%m-%d %H:%i:%s') as iu_reg_datetime, c.username as recommender, IFNULL((select SUM(bet_amount) as total from user_bet_infos where mbno = a.id and bet_status = 3 and date_format(bet_time, '%Y-%m-%d') = CURDATE()), 0) as betSum, IFNULL((select SUM(bet_amount) as total from user_bet_infos where mbno = a.id and (bet_status = 2 or bet_status = 1)), 0) as betWaiting, (select count(ilh_idx) as logqty from info_login_history where ilh_member = a.id) as logtemp, IFNULL((select SUM(it_amount) as deposit from info_transaction where it_target = a.id and it_type = 'deposit' and it_status = 2 and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user') and (it_reason IS NULL OR it_reason = 'GWALLET DEPOSIT' OR it_reason = 'SHOP COIN DEPOSIT')), 0) as deposit, IFNULL((select SUM(it_amount) as withdrawal from info_transaction where it_target = a.id and it_type = 'withdraw' and it_status = 2 and it_proceed IN ('user', 'gwallet-user') and (it_reason IS NULL OR it_reason = 'GWALLET WITHDRAW')), 0) as withdraw, (IFNULL((select SUM(it_amount) as deposit from info_transaction where it_target = a.id and it_type = 'deposit' and it_status = 2 and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user') and (it_reason IS NULL OR it_reason = 'GWALLET DEPOSIT' OR it_reason = 'SHOP COIN DEPOSIT')), 0) - IFNULL((select SUM(it_amount) as withdrawal from info_transaction where it_target = a.id and it_type = 'withdraw' and it_status = 2 and it_proceed IN ('user', 'gwallet-user') and (it_reason IS NULL OR it_reason = 'GWALLET WITHDRAW')), 0)) as loosing, (SELECT IF(lastCount IS NULL, 0, lastCount)) as lastCountFinal from info_user as a left join info_agent as b on a.iu_partner = b.ia_idx left join info_user as c on c.id = a.iu_recommend where a.iu_memtype NOT IN ('테스트아이디', '총판전용아이디') and a.iu_partner NOT IN (261, 262, 264, 273, 274, 280) and a.iu_status = 1 order by a.iu_reg_datetime desc";

            const memberlist = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(memberlist);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async fetchAllMemberListSearch(req, res) {
        const parentdata = req.body.data;
        const selectedAgent = parentdata.selectedAgent;
        const selectedCode = parentdata.selectedCode;
        const selectedLevel = parentdata.selectedLevel;
        const selectedMember = parentdata.selectedMember;
        const selectedField = parentdata.selectedField;
        const selectedKeyword = parentdata.searchKeyWord;
        const selectedFromDate = parentdata.selectedFromDate;
        const selectedToDate = parentdata.selectedToDate;
        var cond = "a.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and a.iu_partner NOT IN (261,262,264,273,274,280)";
        var condtext = "";
        try {
            if (selectedAgent !== null) {
                if (selectedAgent != "-1") {
                    var ncond = " and a.iu_partner='" + selectedAgent + "'";
                    cond = cond + ncond;
                }
            }
            if (selectedCode !== null) {
                if (selectedCode != "코드") {
                    var ncond = " and a.real_code='" + selectedCode + "'";
                    cond = cond + ncond;
                }
            }
            if (selectedLevel !== null) {
                if (selectedLevel != "-1") {
                    var ncond = " and a.iu_level='" + selectedLevel + "'";
                    cond = cond + ncond;
                }
            }
            if (selectedMember !== null) {
                if (selectedMember != "-1") {
                    var ncond = " and a.iu_memtype='" + selectedMember + "'";
                    cond = cond + ncond;
                }
            }
            if (selectedField !== null) {
                if (selectedKeyword !== null) {
                    if (selectedField == "a.iu_recommend") {
                        const subquefinal = "select id from info_user where username = '" + selectedKeyword + "'";
                        const text = await db.query(subquefinal, {
                            type: QueryTypes.SELECT
                        });
                        condtext = text[0].id;
                        var ncond = " and " + selectedField + " = '" + condtext + "' ";
                        cond = cond + ncond;
                    }
                    else {
                        condtext = selectedKeyword;
                        var ncond = " and " + selectedField + " like '%" + condtext + "%' ";
                        cond = cond + ncond;
                    }

                }
            }
            if (selectedFromDate !== null) {
                var n1 = selectedFromDate.split("T")[0];
                var n2 = selectedFromDate.split("T")[1];
                var n3 = n2.split(".")[0];
                var fromdate = n1 + " " + n3;
                var ncond = " and date_format(a.iu_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '" + fromdate + "'";
                cond = cond + ncond;
            }
            if (selectedToDate !== null) {
                var n1 = selectedToDate.split("T")[0];
                var n2 = selectedToDate.split("T")[1];
                var n3 = n2.split(".")[0];
                var fromdate = n1 + " " + n3;
                var ncond = " and date_format(a.iu_reg_datetime,'%Y-%m-%d %H:%i:%s') <= '" + fromdate + "'";
                cond = cond + ncond;
            }


            try {
                const quefinal = "Select DATEDIFF(NOW(), a.iu_last_login) as lastCount, b.ia_idx , b.ia_name, a.iu_recommend, a.username, a.iu_name, a.id, a.iu_status, a.real_code, a.iu_level, a.iu_memtype, a.iu_nickname, a.iu_phone, a.iu_balance, a.iu_point, a.iu_reg_ip, a.iu_last_ip, date_format(a.iu_last_login, '%Y-%m-%d %H:%i:%s') as iu_last_login, date_format(a.iu_reg_datetime, '%Y-%m-%d %H:%i:%s') as iu_reg_datetime, c.username as recommender, IFNULL((select SUM(bet_amount) as total from user_bet_infos where mbno = a.id and bet_status = 3 and date_format(bet_time, '%Y-%m-%d') = CURDATE()), 0) as betSum, IFNULL((select SUM(bet_amount) as total from user_bet_infos where mbno = a.id and (bet_status = 2 or bet_status = 1)), 0) as betWaiting, (select count(ilh_idx) as logqty from info_login_history where ilh_member = a.id) as logtemp, IFNULL((select SUM(it_amount) as deposit from info_transaction where it_target = a.id and it_type = 'deposit' and it_status = 2 and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user') and (it_reason IS NULL OR it_reason = 'GWALLET DEPOSIT' OR it_reason = 'SHOP COIN DEPOSIT')), 0) as deposit, IFNULL((select SUM(it_amount) as withdrawal from info_transaction where it_target = a.id and it_type = 'withdraw' and it_status = 2 and it_proceed IN ('user', 'gwallet-user') and (it_reason IS NULL OR it_reason = 'GWALLET WITHDRAW')), 0) as withdraw, (IFNULL((select SUM(it_amount) as deposit from info_transaction where it_target = a.id and it_type = 'deposit' and it_status = 2 and it_proceed IN ('user', 'gwallet-user', 'shopcoin-user') and (it_reason IS NULL OR it_reason = 'GWALLET DEPOSIT' OR it_reason = 'SHOP COIN DEPOSIT')), 0) - IFNULL((select SUM(it_amount) as withdrawal from info_transaction where it_target = a.id and it_type = 'withdraw' and it_status = 2 and it_proceed IN ('user', 'gwallet-user') and (it_reason IS NULL OR it_reason = 'GWALLET WITHDRAW')), 0)) as loosing, (SELECT IF(lastCount IS NULL, 0, lastCount)) as lastCountFinal from info_user as a left join info_agent as b on a.iu_partner = b.ia_idx left join info_user as c on c.id = a.iu_recommend where " + cond + " and a.iu_status=1 order by a.iu_reg_datetime desc";
                var memberlist = await db.query(quefinal, {
                    type: QueryTypes.SELECT
                });
            } catch (error) {
                var memberlist = [];
            }
            res.status(200).json(memberlist);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async fetchAllCodeByAgent(req, res) {
        const id = req.params.id;
        try {
            if (id == '-1') {
                var codes = await Code.findAll({
                    order: [
                        ['icd_idx', 'DESC']
                    ]
                });
            }
            else {
                var codes = await Code.findAll({
                    where: {
                        [Op.and]: [
                            { status: { [Op.lt]: 2 } },
                            { icd_agent: id }
                        ]
                    },
                    order: [
                        ['icd_idx', 'DESC']
                    ]
                });
            }

            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async fetchAllAgentByCode(req, res) {
        const id = req.params.id;
        try {
            if (id == "-1") {
                var codes = await Agent.findAll({
                    where: {
                        status: 1
                    },
                    order: [
                        ['ia_level', 'DESC']
                    ],
                    attributes: ['ia_idx', 'ia_name', 'ia_level']
                });

            }
            else {
                var quefinal = "select * from info_agent as a left join info_code as b on a.ia_idx=b.icd_agent where b.icd_code='" + id + "'";
                var codes = await db.query(quefinal, {
                    type: QueryTypes.SELECT
                });
            }

            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async filterFetchCode(req, res) {
        const id = req.params.id;
        try {
            var quefinal = "select * from info_code as a left join info_agent as b on b.ia_idx=a.icd_agent where a.icd_code='" + id + "'";
            var codes = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async filterFetchAgent(req, res) {
        const id = req.params.id;
        try {
            var quefinal = "select * from info_code as a left join info_agent as b on b.ia_idx=a.icd_agent where b.ia_name='" + id + "'";
            var codes = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async forceLogout(req, res, next) {
        const userid = req.body.userid;
        try {
            let sql = "update info_user set iu_last_login=NOW() where id='" + userid + "'"
            const sql_result = await db.query(sql, {
                type: QueryTypes.UPDATE
            });

            res.status(200).json({ message: 'Successfully logout member' });
        } catch (error) {
            res.status(200).json({ message: error.message });
        }
    }
}
