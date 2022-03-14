const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const Agent = require('../models/agent');
const Code = require('../models/code');
const Account = require('../models/account');
const User = require('../models/user');


var crypto = require('crypto');

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
                                        console.log(two);
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

    static async addcode(req, res) {
        const body = req.body;
        try {
            const coderesult = await Code.findAll({ where: { icd_code: body.icd_code } });
            var msg = "";
            var stats = 0;
            if (coderesult.length > 0) {
                msg = "Code Already Exist!";
            } else {
                const code = await Code.create(body);
                msg = "Code Successfully Added";
                stats = 1;
            }

            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async editcode(req, res) {
        const body = req.body;
        const id = req.params.id;
        try {
            const coderesult = await Code.findAll({ where: { icd_code: body.icd_code } });
            var msg = "";
            var stats = 0;
            if (coderesult.length > 0) {
                msg = "Code Already Exist!";
            } else {
                const code = await Code.update(body, { where: { icd_idx: id, icd_agent: body.icd_agent } });
                console.log(code);
                msg = "Code Successfully Updated";
                stats = 1;
            }

            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async deletecode(req, res) {
        const body = req.body.data;
        const params = req.body.params;
        try {
            const code = await Code.update(body, { where: { icd_idx: params.icd_idx, icd_agent: params.icd_agent } });
            const msg = "Code Successfully Deleted";

            res.status(200).json({ message: msg });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async addaccount(req, res) {
        const body = req.body;
        const code = body.parentagent;
        try {
            var msg = "";
            var stats = 0;

            if (body.password.length < 4 || body.password == '' || body.username == '') {
                if (body.password.length < 4) {
                    msg = "Password must be at least 4 characters";
                } else {
                    msg = "Username or Password must be at least 4 characters";
                }
            } else {
                const coderesult = await Code.findAll({ where: { icd_agent: code, icd_status: 0 }, attributes: ['icd_code'] });

                if (coderesult.length < 1) {
                    msg = "Please register a code!";
                    console.log(coderesult);
                } else {
                    msg = "Account successfully added!";
                    stats = 1;

                    body.password = makeHash(body.password);
                    const wpass = makeHash('1234');
                    var userset = {
                        username: body.username,
                        password: body.password,
                        real_code: coderesult[0].icd_code,
                        iu_name: body.name,
                        iu_nickname: body.name,
                        iu_partner: body.parentagent,
                        iu_reg_datetime: body.datenow,
                        iu_reg_ip: body.ip,
                        iu_wpass: wpass,
                        iu_memtype: '총판전용아이디',
                        iu_status: 1,
                    }
                    var accountset = {
                        iac_agent: body.parentagent,
                        iac_name: body.name,
                        username: body.username,
                        password: body.password,
                        temp_password: body.password,
                        iac_status: body.status,
                        iac_ip: body.reg_ip,
                        iac_reg_datetime: body.datenow,
                        iac_reg_ip: body.ip,
                        iac_action: body.action,
                    }

                    const accres = await Account.create(accountset);
                    const userres = await User.create(userset);
                }
            }

            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async editaccount(req, res) {
        const body = req.body;

        try {
            var msg = "";
            var stats = 0;

            if (body.password.length < 4 || body.password == '' || body.username == '') {
                if (body.password.length < 4) {
                    msg = "Password must be at least 4 characters";
                } else {
                    msg = "Username or Password must be at least 4 characters";
                }
            } else {
                const temppass = body.password;
                body.password = makeHash(body.password);
                var edit = {
                    iac_name: body.name,
                    username: body.username,
                    iac_status: body.status,
                    iac_ip: body.reg_ip,
                    password: body.password,
                    temp_password: temppass,
                };

                if (body.status == 1) {
                    const coderes = await Code.update({ icd_status: body.status, status: body.status }, { where: { icd_idx: body.parentagent } });
                    const agentres = await Agent.update({ ia_status: body.status }, { where: { ia_idx: body.parentagent } });
                    console.log(coderes);
                    console.log(agentres);
                }

                stats = 1;
                msg = "Account updated successfully!";
                const accres = await Account.update(edit, { where: { id: body.id, iac_agent: body.parentagent } });
            }

            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async deleteaccount(req, res) {
        const body = req.body;
        try {
            const code = await Account.destroy({ where: { iac_agent: body.agent, id: body.id } });
            console.log(code);
            const msg = "Account Successfully Deleted";

            res.status(200).json({ message: msg });
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
            'parent': 1
        }
    }

    return tree;

    // return resagentdata;
}

async function geteachdata(id, depth) {
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
            'parent': body.ia_parent
        }
        trees[count] = tree;
    }

    return trees;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeHash(param) {
    var param = param;
    if (param.length < 4) {
        param = getRndInteger(11, 99) + '' + getRndInteger(11, 99) + '' + getRndInteger(11, 99) + '' + getRndInteger(11, 99) + '' + getRndInteger(11, 99) + '' + getRndInteger(11, 99);
    }
    return crypto.createHash('sha256').update(param).digest('base64');
}

