const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const Agent = require('../models/agent');
const Code = require('../models/code');
const Account = require('../models/account');

module.exports = class API {
    static async getpartnertree(req, res) {
        try {
            var masterid = '224';
            var maindata = await getmasterdata(masterid);
            var tree = await geteachdata(masterid, 2);
            maindata.children = tree;
            var data = [];
            data.push(maindata);
            // data.push(tree);
            // console.log(maindata.children.length);
            for (var i = 0; i < maindata.children.length; i++) {
                // console.log(maindata.children[i].key);
                var one = await geteachdata(maindata.children[i].key, 3);
                // console.log(maindata.children[i].children);
                // if (one.length > 0) {
                //     one.children = [];
                //     data.push(one);
                // }

                maindata.children[i].children = one;
                for (var x = 0; x < maindata.children[i].children.length; x++) {
                    var two = await geteachdata(maindata.children[i].children[x].key, 4);
                    maindata.children[i].children[x].children = two;
                    // if (two.length > 0) { two.children = []; data.push(two); }

                    for (var y = 0; y < maindata.children[i].children[x].children.length; y++) {
                        var three = await geteachdata(maindata.children[i].children[x].children[y].key, 4);
                        maindata.children[i].children[x].children[y].children = three;

                        // if (three.length > 0) { three.children = []; data.push(three); }
                    }
                }
            }

            for (var main in maindata.children) {
                var one = maindata.children[main];
                data.push(one);
                if (one.children.length > 0) {
                    for (var o in one.children) {
                        var onechild = one.children[o];
                        data.push(onechild);
                        if (onechild.length > 0) {
                            for (var oo in onechild.children) {
                                var oneonechild = onechild.children[oo];
                                data.push(oneonechild);
                                console.log(oneonechild);
                                if (oneonechild.length > 0) {
                                    for (var t in oneonechild.children) {
                                        var two = oneonechild.children[t];
                                        data.push(two);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async getpartnerinfo(req, res) {
        const id = req.params.id;
        try {
            const agentresult = await Agent.findByPk(id);
            const coderesult = await Code.findAll({ where: { icd_agent: id, icd_status: { [Op.lt]: 2 } } });
            const accountresult = await Account.findAll({ where: { iac_agent: id, iac_status: { [Op.lt]: 2 } }, order: [['iac_name', 'asc']] });
            res.status(200).json({ agent: agentresult, code: coderesult, account: accountresult });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}

async function getmasterdata(id) {
    const getagentdata = "SELECT ia_idx,ia_balance,ia_fee,ia_loosing,ia_rate,ia_status,ia_name,ia_code from info_agent where ia_idx=" + id + " and status=1";
    const getagentchildcount = "SELECT count(ia_idx) as counter from info_agent where ia_parent =" + id;
    const getuserchildcount = "SELECT count(id) as counter from info_user where iu_partner =" + id + " and iu_status IN (1,4)";
    var tree = [];
    const resagentdata = await db.query(getagentdata, { type: QueryTypes.SELECT });
    const resagentcount = await db.query(getagentchildcount, { type: QueryTypes.SELECT });
    const agentcount = resagentcount;
    const resusercount = await db.query(getuserchildcount, { type: QueryTypes.SELECT });
    const usercount = resusercount;
    // console.log(agentcount);
    for (var count = 0; count < resagentdata.length; count++) {
        var body = resagentdata[count];
        tree = {
            'key': body.ia_idx,
            'title': body.ia_name + ' (' + body.ia_code + ')',
            'balance': body.ia_balance,
            'fee': body.ia_fee,
            'rate': body.ia_rate,
            'loosing': body.ia_loosing,
            'status': body.ia_status,
            'member': usercount[0].counter,
            'folder': agentcount[0].counter,
            'expanded': true,
            'children': [],
            'depth': 1,
            'sorting': 1,
            'parent': 1
        }
    }

    return tree;

    // return resagentdata;
}

async function geteachdata(id, depth, sorting) {
    const getagentdata = "SELECT ia_idx,ia_balance,ia_fee,ia_loosing,ia_rate,ia_status,ia_name,ia_code,ia_parent from info_agent where ia_parent=" + id + " and status=1";

    var trees = [];
    const resagentdata = await db.query(getagentdata, { type: QueryTypes.SELECT });
    // console.log(resagentdata);
    for (var count = 0; count < resagentdata.length; count++) {
        var body = resagentdata[count];
        const getuserchildcount = "SELECT count(id) as counter from info_user where iu_partner =" + body.ia_idx + " and iu_status IN (1,4) and iu_memtype NOT IN ('테스트아이디','총판전용아이디')";
        const resusercount = await db.query(getuserchildcount, { type: QueryTypes.SELECT });
        const usercount = resusercount;
        var tree = {
            'key': body.ia_idx,
            'title': body.ia_name + ' (' + body.ia_code + ')',
            'balance': body.ia_balance,
            'fee': body.ia_fee,
            'rate': body.ia_rate,
            'loosing': body.ia_loosing,
            'status': body.ia_status,
            'member': usercount[0].counter,
            'folder': resagentdata.length,
            'expanded': true,
            'children': [],
            'depth': depth,
            'sorting': count + 1,
            'parent': body.ia_parent
        }
        trees[count] = tree;
    }

    return trees;
}




