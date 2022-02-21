const Transaction = require("../models/transaction");
const Agent = require("../models/agent");
const Code = require("../models/code");
const Board = require("../models/boards");
const Macro = require("../models/macro");
const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const date = require('date-and-time');
const now  =  new Date();
const dtvalue = date.format(now,'YYYY-MM-DD');
let from = dtvalue+" 00:00:00";
let to = dtvalue+" 23:59:59";
var expressPublicIp = require('express-public-ip');


module.exports = class API {
    static async getRadioButtonData(req, res){
        try {
            const que1 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_type='deposit' and it_proceed IN('gwallet-user','user','shopcoin-user')) as bankgwaltotal,";
            const que2 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_type='deposit' and it_status=2 and it_proceed='user') as totalbank,";
            const que3 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_type='deposit' and it_status=2 and it_proceed='gwallet-user') as totalgwallet,";
            const que4 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_type='deposit' and it_status=2 and it_proceed='shopcoin-user') as totalshop,";
            const que5 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_status=0 and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user')) as totalnew,";
            const que6 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_status=1 and it_proceed IN('user','gwallet-user','shopcoin-user')) as totalwait,";
            const que7 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_status=2 and it_proceed IN('user','gwallet-user','shopcoin-user')) as totalcompleted,";
            const que8 = "(select count(it_idx) from info_transaction as a where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_status = 3 and it_proceed IN('user','gwallet-user','shopcoin-user')) as totalcancelled";



            const quefinal = "select "+que1+que2+que3+que4+que5+que6+que7+que8;
            const radiofilter = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });
            res.status(200).json(radiofilter);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async getTableData(req, res){
        try {

            const quefinal = "Select a.*,(SELECT FORMAT(a.it_amount, 0)) as newAmount,(SELECT FORMAT(a.it_point, 0)) as newPoint, b.*, c.*, (select count(it_idx) from info_transaction where it_status='2' and it_proceed IN ('user','gwallet-user','shopcoin-user') and it_type='deposit' and it_target = a.it_target and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+from+"') as depositcount, (select count(it_idx) from info_transaction where it_status='2' and it_proceed IN ('user','gwallet-user','shopcoin-user') and it_type='withdraw' and it_target = a.it_target and date_format(it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+from+"') as withdrawalcount from info_transaction as a left join info_user as b on a.it_target = b.id left join info_agent as c on b.iu_partner = c.ia_idx where date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') >= '"+from+"' and date_format(a.it_reg_datetime, '%Y-%m-%d %H:%i:%s') <= '"+to+"' and it_type IN('deposit', 'withdraw') and a.it_proceed IN('gwallet-user', 'user', 'shopcoin-user') order by a.it_idx desc";
            const radiofilter = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });

            res.status(200).json(radiofilter);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async transactType1(req, res){
        try {
            const data = req.body;
            if(data.length > 0){
                //pag merong check kahit isang checkbox
                res.json({
                    message: "YES"
                }) 
            }
            else{
                //pag walang check kahit isang checkbox
                res.json({
                    message: "NO"
                }) 
            }
        } catch (error) {
            res.json({message : error.message})
        }
    }

    static async transactType2(req, res){
        try {
            const data = req.body;
            if(data.length > 0){
                //pag merong check kahit isang checkbox
                res.json({
                    message: "YES"
                }) 
            }
            else{
                //pag walang check kahit isang checkbox
                res.json({
                    message: "NO"
                }) 
            }
        } catch (error) {
            res.json({message : error.message})
        }
    }

    static async transactType3(req, res){
        try {
            const data = req.body;
            if(data.length > 0){
                //pag merong check kahit isang checkbox
                res.json({
                    message: "YES"
                }) 
            }
            else{
                //pag walang check kahit isang checkbox
                res.json({
                    message: "NO"
                }) 
            }
        } catch (error) {
            res.json({message : error.message})
        }
    }
    static async getMacroSelection(req, res){
        try {
            const macro = await Board.findAll({ 
                where: {
                    [Op.and]: [
                        { ibd_type: 'form' },
                        { ibd_idx: {[Op.gt]: 10} }
                    ]
                },
                order: [
                    ['ibd_title', 'ASC']
                ]
            });
            res.status(200).json(macro)
        } catch (error) {
            res.json({message : error.message})
        }
    }
    static async getMacroSelectionContent(req, res){
        const id = req.params.id;
        try {
            const macro = await Board.findAll({ 
                where: {
                    ibd_idx : id
                }
            });
            res.status(200).json(macro)
        } catch (error) {
            res.json({message : error.message})
        }
    }
    static async getMacroGroup(req, res){
        try {
            const macrogroup = await Macro.findAll({ 
                where: {
                    group_status : 1
                },
                order: [
                    ['group_sorting', 'ASC']
                ]
            });
            res.status(200).json(macrogroup)
        } catch (error) {
            res.json({message : error.message})
        }
    }
    
    static async fetchAllCodeByAgent(req, res){
        const id = req.params.id;
        try {
            if(id == '-1'){
                var codes = await Code.findAll({
                    order: [
                        ['icd_idx', 'DESC']
                    ]
                });
            }
            else{
                var codes = await Code.findAll({ 
                    where: {
                        [Op.and]:[
                            {status: { [Op.lt]: 2  }},
                            {icd_agent:id}
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
    static async fetchAllAgentByCode(req, res){
        const id = req.params.id;
        try {
            if(id == "-1"){
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
            else{
                var quefinal = "select * from info_agent as a left join info_code as b on a.ia_idx=b.icd_agent where b.icd_code='"+id+"'";
                var codes = await db.query(quefinal, {
                    type: QueryTypes.SELECT
                });
            }

            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async fetchAllAgents(req, res){
        try {
            var agents = await Agent.findAll({ 
                where: {
                    status: 1
                },
                order: [
                    ['ia_level', 'DESC']
                ],
                attributes: ['ia_idx', 'ia_name', 'ia_level']
            });
            res.status(200).json(agents);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async fetchAllCodes(req, res){
        try {
            const codes = await Code.findAll({ 
                where: {
                    status: {
                        [Op.lt]: 2 
                    }
                },
                order: [
                    ['icd_idx', 'DESC']
                ]
            });
            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async fetchAllSearch(req, res){
        const parentdata = req.body;
        const AgentFilter = parentdata.AgentFilter;
        const CodeFilter = parentdata.CodeFilter;
        const FieldFilter = parentdata.FieldFilter;
        const KeywordFilter = parentdata.KeywordFilter;
        const TransactionFilter = parentdata.TransactionFilter;
        const WorktypeFilter = parentdata.WorktypeFilter;
        const DatefromFilter = parentdata.DatefromFilter;
        const DatetoFilter = parentdata.DatetoFilter;
        try {

            let contString = " date_format(a.it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+DatefromFilter+"' and date_format(a.it_reg_datetime,'%Y-%m-%d %H:%i:%s') <= '"+DatetoFilter+"'";
            let users1 = " and a.it_proceed IN('user','gwallet-user','shopcoin-user')"

            if(AgentFilter != '-1'){
                contString += " and b.iu_partner = '"+AgentFilter+"'";
            }
            if(CodeFilter != '-1'){
                contString += " and b.real_code = '"+CodeFilter+"'";
            }
            if(KeywordFilter != ""){
                contString += " and b."+FieldFilter+" like '"+KeywordFilter+"'";
            }

            if(WorktypeFilter == "acnotdone"){
                let status = " and a.it_status = 0";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw'"+status+users1;
                }
                else{
                    contString += " and it_type='deposit'"+status+users1;
                }
            }
            else if(WorktypeFilter == "actonlydone"){
                let status = " and a.it_status = 2";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw'"+status+users1;
                }
                else{
                    contString += " and it_type='deposit'"+status+users1;
                }
            }
            else if(WorktypeFilter == "acnotyetdone"){
                let status = " and a.it_status = 1";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw'"+status+users1;
                }
                else{
                    contString += " and it_type='deposit'"+status+users1;
                }
            }
            else if(WorktypeFilter == "cancelled"){
                let status = " and a.it_status = 3";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw'"+status+users1;
                }
                else{
                    contString += " and it_type='deposit'"+status+users1;
                }
            }
            else if(WorktypeFilter == "all"){
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw'"+users1;
                }
                if(TransactionFilter == "deposit"){
                    contString += " and it_type='deposit'"+users1;
                }
                else{
                    contString += " and it_type IN('withdraw','deposit')"+users1;
                }
            }
            else if(WorktypeFilter == "bank"){
                let status = " and a.it_status = 2";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw' and a.it_proceed='user'"+status;
                }
                if(TransactionFilter == "deposit"){
                    contString += " and it_type='deposit' and a.it_proceed='user'"+status;
                }
                else{
                    contString += " and it_type IN('withdraw','deposit') and a.it_proceed='user'";
                }
            }
            else if(WorktypeFilter == "gwallet"){
                let status = " and a.it_status = 2";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw' and a.it_proceed='gwallet-user'"+status;
                }
                if(TransactionFilter == "deposit"){
                    contString += " and it_type='deposit' and a.it_proceed='gwallet-user'"+status;
                }
                else{
                    contString += " and it_type IN('withdraw','deposit') and a.it_proceed='gwallet-user'";
                }
            }
            else if(WorktypeFilter == "shopcoin"){
                let status = " and a.it_status = 2";
                if(TransactionFilter == "withdraw"){
                    contString += " and it_type='withdraw' and a.it_proceed='shopcoin-user'"+status;
                }
                if(TransactionFilter == "deposit"){
                    contString += " and it_type='deposit' and a.it_proceed='shopcoin-user'"+status;
                }
                else{
                    contString += " and it_type IN('withdraw','deposit') and a.it_proceed='shopcoin-user'";
                }
            }
            else{
                contString += " and it_type IN('withdraw','deposit')"+users1;
            }

            contString += " order by a.it_idx desc";

            const quefinal = "select *,(SELECT FORMAT(a.it_amount, 0)) as newAmount,(SELECT FORMAT(a.it_point, 0)) as newPoint from info_transaction as a left join info_user as b on a.it_target = b.id left join info_agent as c on b.iu_partner = c.ia_idx where"+contString;
            const newData = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });
            res.status(202).json(newData);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async fetchNewRadioData(req, res){
        const parentdata = req.body;
        const AgentFilter = parentdata.AgentFilter;
        const CodeFilter = parentdata.CodeFilter;
        const FieldFilter = parentdata.FieldFilter;
        const KeywordFilter = parentdata.KeywordFilter;
        const DatefromFilter = parentdata.DatefromFilter;
        const DatetoFilter = parentdata.DatetoFilter;
        const TransactionFilter = parentdata.TransactionFilter;
        try {
            let contString = " date_format(a.it_reg_datetime,'%Y-%m-%d %H:%i:%s') >= '"+DatefromFilter+"' and date_format(a.it_reg_datetime,'%Y-%m-%d %H:%i:%s') <= '"+DatetoFilter+"'";

            if(AgentFilter > 0){
                contString += " and b.iu_partner = '"+AgentFilter+"'";
            }
            if(CodeFilter != '-1'){
                contString += " and b.real_code = '"+CodeFilter+"'";
            }
            if(KeywordFilter != ""){
                contString += " and b."+FieldFilter+" like '"+KeywordFilter+"'";
            }

            if(TransactionFilter == "withdraw"){
                contString += " and it_type='withdraw'";
            }
            else{
                contString += " and it_type='deposit'";
            }


            const que1 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_proceed IN('gwallet-user','user','shopcoin-user')) as bankgwaltotal,";
            const que2 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 2 and it_proceed='user') as totalbank,";
            const que3 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 2 and it_proceed='gwallet-user') as totalgwallet,";
            const que4 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 2 and it_proceed='shopcoin-user') as totalshop,";
            const que5 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 0 and (it_proceed='user' OR it_proceed='gwallet-user' OR it_proceed='shopcoin-user')) as totalnew,";
            const que6 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 1 and it_proceed IN('user','gwallet-user','shopcoin-user')) as totalwait,";
            const que7 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 2 and it_proceed IN('user','gwallet-user','shopcoin-user')) as totalcompleted,";
            const que8 = "(select count(it_idx) from info_transaction as a left join info_user as b on a.it_target=b.id where"+contString+" and it_status = 3 and it_proceed IN('user','gwallet-user','shopcoin-user')) as totalcancelled";


            
            const quefinal = "select "+que1+que2+que3+que4+que5+que6+que7+que8;
            console.log(quefinal)
            const radiofilter = await db.query(quefinal, {
                type: QueryTypes.SELECT
            });

            res.status(202).json(radiofilter);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}