const db = require('../db_config.js');
const User = require("../models/user");
const Transaction = require("../models/transaction");
const UserCashHistory = require("../models/usercashhistory");
const Code = require("../models/code");
const BankList = require("../models/banklist");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const date = require('date-and-time');
const now  =  new Date();
const dtvalue = date.format(now,'YYYY-MM-DD H:i:s');
const date1 = date.format(now,'YYYY-MM-DD H:i:s');
const date2 = date.format(now,'YYYY-MM-DD');

module.exports = class API {
    static async UserPopupInformationTab(req, res){
        const id = req.params.id;
        try {
            const users = await User.findAll({ 
                where: {
                    id: id
                }
            });

            res.status(200).json(users);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async UserPopupInformationTabGetBankList(req, res){
        try {
            const list = await BankList.findAll({
                where: {
                    bank_status: 1
                }
            });

            res.status(200).json(list);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getDepositData(req, res){
        const id = req.params.id;
        try {
            let sql = "Select b.username,a.it_amount,a.it_point,a.it_after_balance,a.it_type,a.it_reason,a.it_update_datetime,c.ia_name as pname2 from info_transaction as a left join info_user as b on a.it_target = b.id left join info_agent as c on b.iu_partner=c.ia_idx where a.it_target = '"+id+"' and (a.it_status = 2) and a.it_proceed IN ('user','gwallet-user','shopcoin-user','bcoin-user') and a.it_type IN ('withdraw','deposit') and (a.it_reason IS NULL OR a.it_reason IN ('GWALLET WITHDRAW','GWALLET DEPOSIT','SHOP COIN DEPOSIT','BCOIN DEPOSIT')) order by a.it_reg_datetime desc";
            
            const depositdata = await db.query(sql, {
                type: QueryTypes.SELECT
            });
            
            res.status(200).json(depositdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getMoneylogData(req, res){
        const id = req.params.id;
        try {
            let sql = "with newtable as ( select b.username,a.casino_name,a.it_amount,a.it_point,a.it_after_balance,a.it_type,a.it_reason,a.it_update_datetime, c.ia_name as pname2 from info_transaction a left join info_user as b on a.it_target = b.id left join info_agent as c on c.ia_idx=b.iu_partner where it_target='"+id+"' and it_type IN ('withdraw','deposit','point') and it_status IN (2,5)  and (it_reason IS NULL OR it_reason IN ('CASINO WITHDRAW','CASINO DEPOSIT','GWALLET DEPOSIT','GWALLET WITHDRAW', 'SHOP COIN DEPOSIT', '포인트전환','BCOIN DEPOSIT')) UNION select b.username,NULL as casino_name,a.cash_move_amouint as it_amount,0 as it_point,a.cash_after as it_after_balance,'custom' as it_type,cash_move_reason as it_reason, a.move_date as it_update_datetime, c.ia_name as pname2 from user_cash_historylist a left join info_user as b on a.mbno = b.id left join info_agent as c on c.ia_idx=b.iu_partner where mbno='"+id+"' and ref_num IS NULL and ref_code IS NULL) select * from newtable order by it_update_datetime desc";
            
            const moneylogdata = await db.query(sql, {
                type: QueryTypes.SELECT
            });
            
            res.status(200).json(moneylogdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getBetlogData1st(req, res){
        const id = req.params.id;
        try {
            let sql = "select a.num as num, a.mbno as mbno, b.username as username, a.bet_code as betkey, a.bet_time as bettime, a.bet_oddtotal as betoddtotal, a.cash_before as cashbefore, a.bet_amount as betamount, a.cash_after as cashafter, a.bet_result,a.is_realtime, (select ac.cash_after as settle_cash  from user_cash_historylist ac where ac.cash_move_type='입금' and ac.ref_code = betkey) as newcashsettlement, (select FORMAT(IF(newcashsettlement IS NULL, a.cash_after, newcashsettlement), 0)) as cashsettled, IF(a.is_realtime = '0', (select EXP(SUM(LOG(myBetVals))) as betvals from user_bet_list where bet_key = betkey and bet_result NOT IN ('cancel','cancel-user','draw')),  IF(a.is_realtime = '2', a.bet_oddtotal, IF(a.is_realtime = '3', (select gb.data_odds from game_bet_info_realtime gb  where gb.bet_code=betkey and gb.gstatus NOT IN ('cancel','cancel-user','draw') LIMIT 1), a.bet_oddtotal))) as newodds, (select FORMAT(IF(a.bet_result = 'win', newodds * betamount, '0'), 0)) as estimated, a.processedDate as proDate from user_bet_infos a left join info_user b ON a.mbno = b.id where a.mbno = '"+id+"' order by bettime desc";
            
            const betlogdata = await db.query(sql, {
                type: QueryTypes.SELECT
            });
            
            res.status(200).json(betlogdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getPointlogData(req, res){
        const id = req.params.id;
        try {
            let sql = "select a.*,b.username  from info_point_log as a left join info_user as b on a.ipl_user=b.id where a.ipl_user='"+id+"' and ipl_amount<>0 order by ipl_idx desc";
            
            const pointlogdata = await db.query(sql, {
                type: QueryTypes.SELECT
            });
            
            res.status(200).json(pointlogdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async updateSurveillanceStatus(req, res){
        const data = req.body;
        const id = data.id;
        const value = data.value;
        try {
            let sql = "update info_user set under_surveillance = '"+value+"' where id = '"+id+"'";
            
            const users = await db.query(sql, {
                type: QueryTypes.UPDATE
            });
            
            res.status(200).json({
                message : "Update Successfully!"
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async refreshBalanceAndPoint(req, res){
        const id = req.params.id;
        try {
            const users = await User.findAll({ 
                where: {
                    id: id
                },
                attributes:['iu_balance','iu_point']
            });

            res.status(200).json(users);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async UserPopupInformationTabGetNewCasino(req, res){
        const id = req.params.id;
        try {
            const users = await User.findAll({ 
                where: {
                    id: id
                },
                attributes: ['iu_evolution','iu_micro','iu_dream','iu_vivo','iu_asia','iu_gameplay']
            });

            res.status(200).json(users);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async UserPopupInformationTabGetNewSlot(req, res){
        const id = req.params.id;
        try {
            const users = await User.findAll({ 
                where: {
                    id: id
                },
                attributes: ['iu_pragmatic','iu_qtslot','iu_fgslot','iu_microslot','iu_cq9slot','iu_mdslot']
            });

            res.status(200).json(users);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async UserPopupInformationTabGetRecommender(req, res){
        const id = req.params.id;
        try {
            const users = await User.findAll({ 
                where: {
                    id: id
                },
                attributes: ['username']
            });
            
            if(users.length > 0){
                res.status(200).json({
                    value : users[0].username
                });
            }
            else{
                res.status(200).json({
                    value : "-"
                });
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getCodeName(req, res){
        const id = req.params.id;
        try {
            let sql = "select icd_code,ia_name from info_code as a left join info_agent as b on a.icd_agent=b.ia_idx where a.icd_code='"+id+"'";
            
            const codename = await db.query(sql, {
                type: QueryTypes.SELECT
            });
            
            res.status(200).json(codename);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async getUserBetInfo(req, res){
        const id = req.params.id;
        try {
            //Deposit
            let t1q1 = "(select sum( it_amount ) from info_transaction where it_target='"+id+"' and it_type='deposit' and (it_reason IS NULL or it_reason IN ('GWALLET DEPOSIT','SHOP COIN DEPOSIT','BCOIN DEPOSIT')) and it_proceed IN('user','gwallet-user','shopcoin-user','bcoin-user') and it_status=2 and it_reg_date = CURDATE() ) as transinToday,";
            let t1q2 = "(select sum(it_amount) from info_transaction where it_target='"+id+"' and it_type='deposit' and (it_reason IS NULL or it_reason IN('GWALLET DEPOSIT','SHOP COIN DEPOSIT','BCOIN DEPOSIT')) and it_proceed IN('user','gwallet-user','shopcoin-user','bcoin-user') and it_status=2) as totalDeposit,";
            let t1q3 = "(select count( it_idx ) from info_transaction where it_target='"+id+"' and it_type='deposit' and (it_reason IS NULL or it_reason IN('GWALLET DEPOSIT','SHOP COIN DEPOSIT','BCOIN DEPOSIT')) and it_proceed IN('user','gwallet-user','shopcoin-user','bcoin-user') and it_status=2) as depositCount,";
            let t1q4 = "(select count( it_idx ) from info_transaction where it_target='"+id+"' and it_type='deposit' and (it_reason IS NULL or it_reason IN('GWALLET DEPOSIT','SHOP COIN DEPOSIT','BCOIN DEPOSIT')) and it_proceed IN('user','gwallet-user','shopcoin-user','bcoin-user') and it_status=2 and it_reg_date = CURDATE()) as todayCountDeposit,";
            //Withdraw
            let t2q1 = "(select sum( it_amount ) from info_transaction where it_target='"+id+"' and it_type='withdraw' and (it_reason IS NULL or it_reason='GWALLET WITHDRAW') and it_proceed IN('user','gwallet-user','shopcoin-user') and it_status = 2 and it_reg_date = CURDATE()) as transoutToday,"; 
            let t2q2 = "(select sum( it_amount ) from info_transaction where it_target='"+id+"' and it_type='withdraw' and (it_reason IS NULL or it_reason='GWALLET WITHDRAW') and it_proceed IN('user','gwallet-user','shopcoin-user') and it_status = 2) as totalWithdraw,";
            let t2q3 = "(select count( it_idx ) from info_transaction where it_target='"+id+"' and it_type='withdraw' and (it_reason IS NULL or it_reason='GWALLET WITHDRAW') and it_proceed IN('user','gwallet-user','shopcoin-user') and it_status = 2 and it_reg_date = CURDATE()) as withdrawCount,";
            let t2q4 = "(select count( it_idx ) from info_transaction where it_target='"+id+"' and it_type='withdraw' and (it_reason IS NULL or it_reason='GWALLET WITHDRAW') and it_proceed IN('user','gwallet-user','shopcoin-user') and it_status = 2) as todayCountWithdraw,";
            //bet amount total win SPORTS
            let t3q1 = "(select SUM(bet_amount) from user_bet_infos where mbno = '"+id+"' and is_realtime = 0 and bet_result NOT IN ('cancel','cancel-user','진행중')) as betAmountSports,";
            let t3q2 = "(select SUM(bet_win_amount) from user_bet_infos where mbno = '"+id+"' and is_realtime = 0 and bet_result NOT IN ('cancel','cancel-user','진행중')) as betWinSports,";
            //bet amount total win LIVE
            let t3q3 = "(select SUM(bet_amount) from user_bet_infos where mbno = '"+id+"' and is_realtime = 3 and bet_result NOT IN ('cancel','cancel-user','진행중')) as betAmountLive,";
            let t3q4 = "(select SUM(bet_win_amount) from user_bet_infos where mbno = '"+id+"' and is_realtime = 3 and bet_result NOT IN ('cancel','cancel-user','진행중')) as betWinLive,";
            //bet amount total win MINIGAME
            let t3q5 = "(select SUM(bet_amount) from user_bet_infos where mbno = '"+id+"' and is_realtime = 2 and bet_result NOT IN ('cancel','cancel-user','진행중')) as betAmountMinigame,";
            let t3q6 = "(select SUM(bet_win_amount) from user_bet_infos where mbno = '"+id+"' and is_realtime = 2 and bet_result NOT IN ('cancel','cancel-user','진행중')) as betWinMinigame,";
            //bet amount total win CASINO
            let t3q7 = "(select SUM(betmoney) from casino_logs where player_id = '"+id+"') as betAmountCasino,";
            let t3q8 = "(select SUM(resultmoney) from casino_logs where player_id = '"+id+"') as betWinCasino,";
            //today bet query
            let t4q1 = "(select sum(bet_amount) from user_bet_infos where mbno='"+id+"' and date_format(bet_time, '%Y-%m-%d') = CURDATE() and bet_result NOT IN ('cancel','cancel-user')) as todayBetmoney,";
            let t4q2 = "(select count( num ) from user_bet_infos where mbno='"+id+"' and date_format(bet_time, '%Y-%m-%d') = CURDATE() and bet_result NOT IN ('cancel','cancel-user')) as todayBetcnt,";
            //total bet query
            let t4q3 = "(select sum(bet_amount) from user_bet_infos where mbno='"+id+"' and bet_result NOT IN ('cancel','cancel-user')) as totalBetmoney,";
            let t4q4 = "(select count(num) from user_bet_infos where mbno='"+id+"' and bet_result NOT IN ('cancel','cancel-user')) as totalBetcnt,";
            //total incom query
            let t5q1 = "(select (transinToday - transoutToday)) as todayIncome,";
            let t5q2 = "(select (totalDeposit - totalWithdraw)) as totalIncome";
            let sql = "Select "+t1q1+t1q2+t1q3+t1q4+t2q1+t2q2+t2q3+t2q4+t3q1+t3q2+t3q3+t3q4+t3q5+t3q6+t3q7+t3q8+t4q1+t4q2+t4q3+t4q4+t5q1+t5q2;
            const userbetinfo = await db.query(sql, {
                type: QueryTypes.SELECT
            });
            
            res.status(200).json(userbetinfo);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async checkRecommender(req, res){
        const rec = req.params.id;
        try {
            const users = await User.findAll({ 
                where: {
                    username: rec
                },
                attributes: ['id']
            });
            res.status(200).json(users[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async checkPartner(req, res){
        const code = req.params.id;
        try {
            const parnter = await Code.findAll({ 
                where: {
                    icd_code: code
                },
                attributes: ['icd_agent']
            });
            res.status(200).json(parnter[0]);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async updateUserInformation(req, res, next){
        //request body
        const id = req.body.memberNum;
        const iu_level = req.body.selectedLevel;
        const iu_status = req.body.selectedMemberStatus;
        const iu_memtype = req.body.selectedMemberType;
        const iu_phone = req.body.userPhonenumber;
        const iu_name = req.body.userName2;
        const iu_bank = req.body.userBank;
        const block = req.body.selectedMemberPaymentStatus;
        const block_prematcheu = req.body.prematchSwitch;
        const block_prematchkor = req.body.prematchkorSwitch;
        const block_live = req.body.liveSwitch;
        const block_minigame = req.body.minigameSwitch;
        const block_casino = req.body.casinoSwitch;
        const block_slot = req.body.slotSwitch;
        const iu_recommend = req.body.userRecommender;
        const minfolder_eu = req.body.userMinifoldereu;
        const minfolder_kr = req.body.userMinifolderkr;
        const minfolder_live = req.body.userMinifolderlive;
        const iu_acc = req.body.userAccount;
        const update_datetime = dtvalue;
        const password = req.body.userChangepass;
        const iu_wpass = req.body.userCurrencypass;
        const real_code = req.body.userPartner;
        const iu_partner = req.body.userChongpanPartner;
        const iu_memo = req.body.userMemo;

        try {
            let message = "";
            let counter = 0;
            let isnum = /^\d+$/.test(iu_phone);

            if(isnum){}
            else{
                counter = 1;
            }

            if(counter > 0){
                if(counter == 1){
                    message = "Phone Number must exist only number."
                }

                res.status(200).json({
                    message
                });
            }
            else{
                const updateUser = await User.update(
                    { 
                        iu_level,
                        iu_status,
                        iu_memtype,
                        iu_phone,
                        iu_name,
                        iu_bank,
                        block,
                        block_prematcheu,
                        block_prematchkor,
                        block_live,
                        block_minigame,
                        block_casino,
                        block_slot,
                        iu_recommend,
                        minfolder_eu,
                        minfolder_kr,
                        minfolder_live,
                        iu_acc,
                        real_code,
                        iu_partner,
                        iu_memo,
                        update_datetime
                    },
                    { where: { id } }
                );

                if(password != ""){
                    const updateUserPassword = await User.update(
                        { 
                            password
                        },
                        { where: { id } }
                    );
                }

                if(iu_wpass != ""){
                    const updateUserPasswordCurr = await User.update(
                        { 
                            iu_wpass
                        },
                        { where: { id } }
                    );
                }
    
                res.status(200).json({
                    message: "Successfully User Information Updated."
                });
            }

        } catch (error) {
            next(error);
        }
    }
    static async updateBalance(req,res,next){
        const id = req.body.userid;
        const balanceAfter = req.body.after;
        try {
            const balance = await User.update(
                { 
                    iu_balance : balanceAfter
                },
                { where: { id } }
            );
            res.json({
                message : "OK"
            });
        } catch (error) {
            res.json({ 
                message: "NOT OK"
            });
        }
    }
    static async addTransaction(req,res,next){
        const id = req.body.userid;
        const reason = req.body.reason;
        const amount = req.body.amount;
        const ip =req.body.ip;
        const before =req.body.before;
        const after =req.body.after;
        const point =req.body.point;
        try {
            const transaction = await Transaction.create({
                it_spc : 'member',
                it_type : 'deposit',
                it_proceed : 'manager',
                it_reason : reason,
                it_target : id,
                it_amount : amount,
                it_point : '0',
                it_status : '2',
                it_reg_ip : ip,
                it_update_ip : ip,
                it_reg_date : date1,
                it_reg_datetime : date2,
                it_update_datetime : date1,
                it_before_balance : before,
                it_after_balance : after,
                it_before_point : point,
                it_action : '1',
                it_manager_no : '0',
                it_has_error : '0',
                notification : '1'
            });

            const transaction2 = await UserCashHistory.create({
                mbno : id,
                cash_move_reason : reason,
                cash_move_amouint : amount,
                cash_before : before,
                cash_after : after,
                it_amount : amount,
                cash_move_type : '입금',
                move_date : date1
            });

            res.status(200).json({
                message: "Successfully Money Added."
            });
        } catch (error) {
            res.status(200).json({ message: error.message });
        }
    }
}