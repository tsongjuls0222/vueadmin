const Transaction = require("../models/transaction");
const User = require("../models/user");
const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const date = require('date-and-time');
const now  =  new Date();
const dtvalue = date.format(now,'YYYY-MM-DD HH:mm:ss');

module.exports = class API {
    static async fetchAllTransaction(req, res){
        try {
            //충전신청
            const que1 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='deposit' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=0) as deposit_request,";
            const que2 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='deposit' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=1) as deposit_pending,";
            const que3 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='deposit' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=2) as deposit_count,";
            const que4 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=0) as withdraw_request,";
            const que5 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=1) as withdraw_pending,";
            const que6 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=2) as withdraw_count,";
            const que7 = "(select count(it_idx) from partner_info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and (it_status=0 OR it_status=1)) as partnerwithdraw,";
            const que8 = "(select count(ics_idx) from info_cs where notification='0' and req_type=9) as 1대1,";
            const que9 = "(select count(id) from info_user where iu_status=0) as newmember,";
            const que10 = "(select count(id) from info_user where date_format(iu_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and iu_status=0) as okmember,";
            const que11 = "(select count(ics_idx) from info_cs where date_format(ics_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and ics_status=0 and req_type = 9 ) as 계좌변경,";
            const que12 = "(select count(it_idx) from info_transaction where it_has_error=1 and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' ) as 정산오류,";
            const que13 = "(select sum(it_amount) from info_transaction as a left join info_user as b on a.it_target=b.id where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status <> 0 and it_type='deposit' and it_status=2 and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"') as deposit,";
            const que14 = "(select sum(it_amount) from info_transaction as a left join info_user as b on a.it_target=b.id where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status <> 0 and it_type='withdraw' and it_status=2 and (it_proceed='user' OR it_proceed='gwallet-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"') as withdraw,";
            const que15 = "(select sum(it_point) from info_transaction as a left join info_user as b on a.it_target=b.id  where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status <> 0 and it_type='deposit' and it_status=2 and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"') as charging_point,";
            const que16 = "(select sum(iu_balance) from info_user where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status=1) as user_holding_money,";
            const que17 = "(select sum(iu_point) from info_user where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status=1) as holding_point";

            const quefinal = "select "+que1+que2+que3+que4+que5+que6+que7+que8+que9+que10+que11+que12+que13+que14+que15+que16+que17;
            const accounts = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });


            var total = accounts[0].deposit - accounts[0].withdraw;
            accounts[0]["loosing"] = total;

            res.status(200).json(accounts[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}