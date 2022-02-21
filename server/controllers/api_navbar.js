const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const date = require('date-and-time');
const now  =  new Date();
const dtvalue = date.format(now,'YYYY-MM-DD 00:00:00');


module.exports = class API {
    static async getTopInfo(req, res){
        try {
            //충전신청
            const que1 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='deposit' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=0) as charge_in,";
            const que2 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='deposit' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=1) as charge_hold,";
            const que3 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='deposit' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=2) as charge_done,";
            const que4 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=0) as withdraw_in,";
            const que5 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=1) as withdraw_hold,";
            const que6 = "(select count(it_idx) from info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디','총판전용아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and it_status=2) as withdraw_done,";
            const que7 = "(select count(it_idx) from partner_info_transaction as it left join info_user as iu on it.it_target=iu.id where iu.iu_partner NOT IN (262,264,273,274,280) and iu.iu_memtype NOT IN ('테스트아이디') and it_type='withdraw' and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and (it_status=0 OR it_status=1)) as partnerwithdraw,";
            const que8 = "(select count(ics_idx) from info_cs where notification='0' and req_type=9) as ask1_1,";
            const que9 = "(select count(id) from info_user where iu_status=0) as newmember,";
            const que10 = "(select count(id) from info_user where date_format(iu_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and iu_status=0) as okmember,";
            const que11 = "(select count(ics_idx) from info_cs where date_format(ics_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' and ics_status=0 and req_type = 9 ) as change_account,";
            const que12 = "(select count(it_idx) from info_transaction where it_has_error=1 and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"' ) as exchage_error,";
            const que13 = "(select sum(it_amount) from info_transaction as a left join info_user as b on a.it_target=b.id where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status <> 0 and it_type='deposit' and it_status=2 and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"') as charge_total,";
            const que14 = "(select sum(it_amount) from info_transaction as a left join info_user as b on a.it_target=b.id where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status <> 0 and it_type='withdraw' and it_status=2 and (it_proceed='user' OR it_proceed='gwallet-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"') as withdraw_total,";
            const que15 = "(select sum(it_point) from info_transaction as a left join info_user as b on a.it_target=b.id  where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status <> 0 and it_type='deposit' and it_status=2 and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user') and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+dtvalue+"') as sentpoint,";
            const que16 = "(select sum(iu_balance) from info_user where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status=1) as cashtotal,";
            const que17 = "(select sum(iu_point) from info_user where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status=1) as pointsTotal,";
            const que18 = "(select (sum(iu_evolution)+sum(iu_micro)+sum(iu_dream)+sum(iu_vivo)+sum(iu_pragmatic)+sum(iu_qtslot)+sum(iu_fgslot)+sum(iu_mdslot)+sum(iu_microslot)+sum(iu_cq9slot)+sum(iu_asia)+sum(iu_gameplay)) as total from info_user where iu_partner NOT IN (262,264,273,274,280) and iu_memtype NOT IN ('테스트아이디','총판전용아이디') and iu_status=1) as totalCasino,";
            const que19 = "(select count(*) from info_cs where ics_status = 0 and req_type = 0) as newcsCnt";
            
            const quefinal = "select "+que1+que2+que3+que4+que5+que6+que7+que8+que9+que10+que11+que12+que13+que14+que15+que16+que17+que18+que19;
            const moneycount = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });
            res.status(200).json(moneycount);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getMoneyCountData(req, res){
        const type = req.body.type;
        try {
            let sql = "";
            let cond = "";
            if(type == "amount" || type == "point"){
                if(type == "amount"){
                    cond = "iu_balance"; 
                }
                else{
                    cond = "iu_point";
                }
            }

            if(type == "casino"){
                sql = "select a.id, b.ia_name, a.real_code, a.iu_level, (select  username from info_user where id = a.iu_recommend ) as recommender, a.username, a.iu_last_login, a.iu_nickname, a.iu_name, a.iu_phone, a.iu_balance, a.iu_point, (iu_evolution + iu_pragmatic + iu_micro + iu_dream + iu_vivo + iu_qtslot + iu_fgslot + iu_mdslot + iu_microslot + iu_cq9slot + iu_asia + iu_gameplay) as total_balance from info_user a left join info_agent b on a.iu_partner = b.ia_idx where a.iu_status = 1 and a.iu_partner NOT IN (262, 264, 273, 274, 280) and a.iu_memtype NOT IN ('테스트아이디', '총판전용아이디') HAVING total_balance > 0";
            }
            else{
                sql = "select a.id, b.ia_name, a.real_code, a.iu_level, (select username from info_user where id = a.iu_recommend ) as recommender, a.username, a.iu_last_login, a.iu_nickname, a.iu_name, a.iu_phone, a.iu_balance, a.iu_point from info_user a left join info_agent b on a.iu_partner = b.ia_idx where a."+cond+" > 0 AND a.iu_status = 1 and a.iu_partner NOT IN (262, 264, 273, 274, 280) and a.iu_memtype NOT IN ('테스트아이디', '총판전용아이디')";
            }

            const moneypopupdata = await db.query(sql, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(moneypopupdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getMoneyCountDataTotal(req, res){
        const type = req.body.type;
        try {
            let sql = "";
            let cond = "";
            if(type == "amount" || type == "point"){
                if(type == "amount"){
                    cond = "iu_balance"; 
                }
                else{
                    cond = "iu_point";
                }
            }

            if(type == "casino"){
                sql = "select sum(iu_evolution + iu_pragmatic + iu_micro + iu_dream + iu_vivo + iu_qtslot + iu_fgslot + iu_mdslot + iu_microslot + iu_cq9slot + iu_asia + iu_gameplay) as total_balance from info_user where iu_status = 1 and iu_partner NOT IN (262, 264, 273, 274, 280) and iu_memtype NOT IN ('테스트아이디', '총판전용아이디')";
            }
            else{
                sql = "select sum("+cond+") as total_balance from info_user where "+cond+" > 0 AND iu_status = 1 and iu_partner NOT IN (262, 264, 273, 274, 280) and iu_memtype NOT IN ('테스트아이디', '총판전용아이디')";
            }

            const moneypopupdatatotal = await db.query(sql, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(moneypopupdatatotal);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getNotoriousCount(req, res){
        try {
            let sql = "SELECT COUNT(ubi.bet_time) as total from user_bet_infos ubi left join info_user iu on iu.id = ubi.mbno WHERE DATE_FORMAT(ubi.bet_time,'%Y-%m-%d') = CURDATE() and ubi.bet_result = '진행중' and iu.under_surveillance = 1";
            
            const notoriouscount = await db.query(sql, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(notoriouscount);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getNotoriousData(req, res){
        try {
            let sql = "SELECT iu.id, iu.iu_name, iu.iu_nickname, iu.real_code, ia.ia_name, iu.username, ubi.mbno, ubi.bet_time, ubi.is_realtime, FORMAT(ubi.bet_amount, '#,###,##0') as bet_amount, FORMAT(ROUND(ubi.bet_amount * ubi.bet_oddtotal), '#,###,##0') as estimated_win from user_bet_infos ubi left join info_user iu on iu.id = ubi.mbno left join info_agent ia on ia.ia_idx = iu.iu_partner WHERE DATE_FORMAT(ubi.bet_time, '%Y-%m-%d') = CURDATE() and ubi.bet_result = '진행중' and iu.under_surveillance = 1";
            
            const notoriousdata = await db.query(sql, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(notoriousdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}