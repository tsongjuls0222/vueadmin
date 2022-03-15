const db = require('../db_config.js');
const { QueryTypes, where } = require('sequelize');
const { Op } = require('sequelize');
const Agent = require('../models/agent');
const Code = require('../models/code');
const Account = require('../models/account');
const User = require('../models/user');
const PCL = require('../models/partner_claim_logs');


var crypto = require('crypto');
const e = require('express');

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
                var one = await geteachdata(maindata.children[i].key, 4);
                // console.log(maindata.children[i].children);
                // if (one.length > 0) {
                //     one.children = [];
                //     data.push(one);
                // }

                maindata.children[i].children = one;
                for (var x = 0; x < maindata.children[i].children.length; x++) {
                    var two = await geteachdata(maindata.children[i].children[x].key, 6);
                    maindata.children[i].children[x].children = two;
                    // if (two.length > 0) { two.children = []; data.push(two); }

                    for (var y = 0; y < maindata.children[i].children[x].children.length; y++) {
                        var three = await geteachdata(maindata.children[i].children[x].children[y].key, 8);
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

                        if (onechild.children.length > 0) {
                            for (var oo in onechild.children) {
                                var oneonechild = onechild.children[oo];
                                data.push(oneonechild);
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
            const agentresult = await Agent.findOne({
                where: { ia_idx: id }, attributes: [
                    'ia_idx', 'ia_master', 'ia_bonsa',
                    'ia_bubonsa', 'ia_chongpan', 'ia_parent',
                    'ia_code', 'ia_account', 'ia_name',
                    'ia_realtime', 'ia_balance', 'ia_fee',
                    'ia_level', 'ia_phone', 'ia_email',
                    'ia_type', 'ia_loosing', 'ia_rate',
                    'ia_status', 'ia_reg', 'ia_last_login',
                    'ia_reg_ip', 'ia_last_ip', 'ia_key',
                    'ia_action', 'ia_partnertype', 'ia_prematch',
                    'ia_minigame', 'ia_casino', 'status',
                    'allowChildren', 'maxChildren', 'agent_memo',
                    'viewingOnly', 'blastPoints', 'pointsLimit'
                ]
            });
            // const agentresult = await Agent.findByPk(id);
            const coderesult = await Code.findAll({ where: { icd_agent: id, icd_status: { [Op.lt]: 2 } } });
            const accountresult = await Account.findAll({ where: { iac_agent: id, iac_status: { [Op.lt]: 2 } }, order: [['iac_name', 'asc']] });
            const pclres = await PCL.findAll({ where: { agent_id: id } });

            var position = "";

            var bubonsa = await bubonsalist();
            bubonsa = bubonsa.filter(data => data.ia_idx == id);
            if (bubonsa != '') {
                position = "bubonsa";
            } else {
                var chongpan = await chongpanlist();
                chongpan = chongpan.filter(data => data.ia_idx == id);
                if (chongpan != '') {
                    position = "chongpan";
                } else {
                    var mejang = await mejanglist();
                    mejang = mejang.filter(data => data.ia_idx == id);
                    if (mejang != '') {
                        position = "mejang";
                    }
                }
            }

            res.status(200).json({ agent: agentresult, code: coderesult, account: accountresult, logs: pclres, position: position });
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
    static async addagent(req, res) {
        const body = req.body;
        try {
            var msg = "";
            var stats = 0;
            var addData = {};
            var type = '';
            var checker = true;

            const codecheck = await Agent.findAll({ where: { ia_code: body.code, status: 1 }, attributes: ['ia_idx'] });
            const parentcheck = await Agent.findOne({ where: { ia_idx: body.parentagent, status: 1 } });

            if (body.code == '') {
                msg = "Code cannot be empty!";
                checker = false;
            }

            if (parseInt(body.parentagent) < 2) {
                msg = "상위코드가 없습니다.";//there is no top code
                checker = false;
            }

            if (codecheck.length > 0) {
                msg = "이미 코드가 존재합니다.";//code already exist
                checker = false;
            }

            if (parseInt(parentcheck.ia_loosing) < parseInt(body.loosing)) {
                msg = "상위 에이전트보다 루징이 작습니다.";//less loosing than parents
                checker = false;
            }

            if (parseInt(parentcheck.ia_rate) < parseInt(body.fee)) {
                msg = "상위 수수료율보다  큽니다..";//higher than the top commision rate.
                checker = false;
            }

            if (checker) {
                if (parentcheck.ia_level == 5) {
                    type = '본사';
                    parentcheck.ia_master = body.parentagent;
                } else if (parentcheck.ia_level == 4) {
                    type = '부본사';
                    parentcheck.ia_bonsa = body.parentagent;
                } else if (parentcheck.ia_level == 3) {
                    type = '총판';
                    parentcheck.ia_bubonsa = body.parentagent;
                } else if (parentcheck.ia_level == 2) {
                    type = '매장';
                    parentcheck.ia_chongpan = body.parentagent;
                }

                addData = {
                    ia_type: type,
                    ia_parent: body.parentagent,
                    ia_level: parseInt(parentcheck.ia_level) - 1,
                    ia_loosing: body.loosing,
                    ia_rate: body.fee,
                    ia_code: body.code,
                    ia_name: body.code,
                    ia_account: body.code,
                    ia_status: body.status,
                    ia_reg: body.datenow,
                    ia_reg_ip: body.ipaddress,
                    ia_prematch: body.prematch,
                    ia_realtime: body.live,
                    ia_minigame: body.minigame,
                    ia_casino: body.casino,
                    ia_partnertype: body.partnertype,
                    allowChildren: body.allowchildren,
                    maxChildren: body.maxhildren,
                    agent_memo: body.memo,
                    viewingOnly: body.viewingonly,
                    blastPoints: body.blastpoints,
                    pointsLimit: body.pointlimit,
                    ia_action: body.action,
                    ia_master: (parentcheck.ia_master > 1) ? parentcheck.ia_master : '',
                    ia_bonsa: (parentcheck.ia_bonsa > 1) ? parentcheck.ia_bonsa : '',
                    ia_bubonsa: (parentcheck.ia_bubonsa > 1) ? parentcheck.ia_bubonsa : '',
                    ia_chongpan: (parentcheck.ia_chongpan > 1) ? parentcheck.ia_chongpan : '',
                }

                const agentres = await Agent.create(addData);
                if (agentres) {
                    stats = 1;
                    msg = "처리 되었습니다.";//processing
                } else {
                    msg = "시스템에러, 처리되지 않았습니다.";//system error
                }
            }

            res.status(200).json({ message: msg, status: stats, result: parentcheck });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async editagent(req, res) {
        const body = req.body;
        console.log(body);
        try {
            var msg = "";
            var stats = 0;
            var editData = {};
            var checker = true;

            const codecheck = await Agent.findAll({ where: { ia_code: body.code, status: 1 }, attributes: ['ia_idx'] });
            const parentcheck = await Agent.findOne({ where: { ia_idx: body.id, status: 1 } });

            if (body.code == '') {
                msg = "Code cannot be empty!";
                checker = false;
            }
            if (codecheck.length > 1) {
                msg = "이미 코드가 존재합니다.";//code already exist
                checker = false;
            }
            if (parseInt(parentcheck.ia_loosing) < parseInt(body.loosing)) {
                msg = "상위 에이전트보다 루징이 작습니다.";//less loosing than parents
                checker = false;
            }

            if (parseInt(parentcheck.ia_rate) < parseInt(body.fee)) {
                msg = "상위 수수료율보다  큽니다..";//higher than the top commision rate.
                checker = false;
            }

            if (checker) {
                editData = {
                    ia_loosing: body.loosing,
                    // ia_rate: body.fee,
                    ia_code: body.code,
                    ia_name: body.name,
                    ia_account: body.code,
                    ia_status: body.status,
                    ia_prematch: body.prematch,
                    ia_realtime: body.live,
                    ia_minigame: body.minigame,
                    ia_casino: body.casino,
                    ia_partnertype: body.partnertype,
                    allowChildren: body.allowchildren,
                    maxChildren: body.maxhildren,
                    agent_memo: body.memo,
                    viewingOnly: body.viewingonly,
                    blastPoints: body.blastpoints,
                    pointsLimit: body.pointlimit,
                }

                const agentres = await Agent.update(editData, { where: { ia_idx: body.id } });
                if (agentres) {
                    stats = 1;
                    msg = "처리 되었습니다.";//processing
                } else {
                    msg = "시스템에러, 처리되지 않았습니다.";//system error
                }

            }

            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async deleteagent(req, res) {
        const body = req.body;
        try {
            const userres = await User.findAll({ where: { iu_partner: body.target }, attributes: ['id'] });
            var msg = "";
            if (userres.length > 0) {
                msg = "This agent has existing member. Transfer the member first before deleting this agent!";
            } else {
                const agentres = await Agent.update({ ia_status: 1 }, { where: { ia_idx: body.target } });
                const coderes = await Code.update({ status: 0, icd_status: 2 }, { where: { icd_agent: body.target } });
                console.log(body.target);
                console.log(coderes);
                console.log(agentres);
                msg = "Agent deleted!";
            }
            res.status(200).json({ message: msg });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async gettransferagentcodes(req, res) {
        try {
            const myquery = "select *, ia_name as parentName from info_agent where ia_idx IN (select distinct(ia_bonsa) from info_agent) OR ia_idx = 224 and status = 1 UNION select a.*, b.ia_name as parentName from info_agent as a left join info_agent as b on a.ia_parent = b.ia_idx where a.ia_level = 3 and a.ia_idx NOT IN(224) and a.status = 1 UNION select a.*, b.ia_name as parentName from info_agent as a left join info_agent as b on a.ia_parent = b.ia_idx where a.ia_parent = 224 and a.ia_idx not in   (select ia_bonsa from info_agent where ia_bonsa IS NOT NULL) and a.ia_idx NOT IN(224) and a.status = 1";
            const result = await db.query(myquery, { type: QueryTypes.SELECT });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getmemberagentcodes(req, res) {
        try {
            const result = await Agent.findAll({ where: { status: 1 } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async transferpartner(req, res) {
        const body = req.body;

        try {
            var msg = 'Cannot transfer this agent!';
            var stats = 0;
            // res.status(404).json({ message: err.message });

            if (body.transfer_who == '' || body.transfer_to == body.transfer_who) {
                msg = "Not applicable! Agent cannot transfer to itself.";
            } else {
                if (body.transfer_type == 'mejang') {
                    //mejang transfer to master and make him bubonsa by record but still chongpan because he doesn't have a partner below his tree
                    if (body.transfer_to == 224) {

                        const resagent = await Agent.update({ ia_bonsa: null, ia_bubonsa: null, ia_parent: body.transfer_to, ia_level: 4 }, { where: { ia_idx: body.transfer_who } });
                        if (resagent) {
                            msg = "처리 되었습니다";
                            stats = 1;
                        } else {
                            msg = "Error transferring partner step 2";
                        }
                    } else {
                        console.log(body);
                        var position = "";
                        var bubonsa = await bubonsalist_by_level();
                        bubonsa = bubonsa.filter(data => data.ia_idx == body.transfer_to);
                        // console.log(bubonsa);
                        if (bubonsa != '') {
                            position = "bubonsa";
                        } else {
                            var chongpan = await chongpanlist_by_level();
                            chongpan = chongpan.filter(data => data.ia_idx == body.transfer_to);
                            if (chongpan != '') {
                                position = "chongpan";
                            } else {
                                var mejang = await mejanglist_by_level();
                                mejang = mejang.filter(data => data.ia_idx == body.transfer_to);
                                if (mejang != '') {
                                    position = "mejang";
                                }
                            }
                        }
                        console.log(position);
                        //mejang transfer to another bubonsa and make him chongpan or transfer to another chongpan and make that chongpan a bubonsa
                        if (position == 'bubonsa') {
                            const resagent = await Agent.update({ ia_bonsa: body.transfer_to, ia_bubonsa: null, ia_parent: body.transfer_to, ia_level: 3 }, { where: { ia_idx: body.transfer_who } });
                            if (resagent) {
                                msg = "처리 되었습니다";
                                stats = 1;
                            } else {
                                msg = "Error transferring partner step 3";
                            }
                        } else {
                            //mejang transfer to another chongpan
                            if (position == 'chongpan') {
                                const res = await Agent.findOne({ where: { ia_idx: body.transfer_to }, attributes: ['ia_parent'] });

                                const resagent = await Agent.update({ ia_bonsa: res.ia_parent, ia_bubonsa: body.transfer_to, ia_parent: body.transfer_to }, { where: { ia_idx: body.transfer_who } });
                                if (resagent) {
                                    msg = "처리 되었습니다";
                                    stats = 1;
                                } else {
                                    msg = "Error transferring partner step 4";
                                }
                            } else {
                                msg = "Please wait, not yet ready. Step 1";
                            }
                        }
                    }
                }

                if (body.transfer_type == "chongpan") {
                    //chongpan transfer to master and make him bubonsa but still chongpan on record because he has no partner under his tree, but if he has mejang below, he will become bubonsa and his mejang will become chongpan
                    if (body.transfer_to == 224) {
                        const resagent = await Agent.update({ ia_bonsa: null, ia_bubonsa: null, ia_parent: body.transfer_to, ia_level: 4 }, { where: { ia_idx: body.transfer_who } });
                        if (resagent) {
                            const resres = await Agent.update({ ia_bonsa: body.transfer_who, ia_bubonsa: null, ia_level: 3 }, { where: { ia_parent: body.transfer_who } });
                            if (resres) {
                                msg = "처리 되었습니다";
                                stats = 1;
                            }
                        } else {
                            msg = "Error transferring partner chongpan step 1";
                        }
                    } else {
                        var position = "";
                        var bubonsa = await bubonsalist_by_level();
                        bubonsa = bubonsa.filter(data => data.ia_idx == body.transfer_to);
                        // console.log(bubonsa);
                        if (bubonsa != '') {
                            position = "bubonsa";
                        } else {
                            var chongpan = await chongpanlist_by_level();
                            chongpan = chongpan.filter(data => data.ia_idx == body.transfer_to);
                            if (chongpan != '') {
                                position = "chongpan";
                            } else {
                                var mejang = await mejanglist_by_level();
                                mejang = mejang.filter(data => data.ia_idx == body.transfer_to);
                                if (mejang != '') {
                                    position = "mejang";
                                }
                            }
                        }

                        if (position == "bubonsa") {
                            const resagent = await Agent.update({ ia_bonsa: body.transfer_to, ia_bubonsa: null, ia_parent: body.transfer_to, ia_level: 3 }, { where: { ia_idx: body.transfer_who } });
                            if (resagent) {
                                const resres = await Agent.update({ ia_bonsa: body.transfer_to }, { where: { ia_parent: body.transfer_who } });
                                if (resres) {
                                    msg = "처리 되었습니다";
                                    stats = 1;
                                } else {
                                    msg = "Error transfering partner chongpan step 2";
                                }
                            } else {
                                msg = "Please wait, not yet ready. Step 2";
                            }
                        }
                    }
                }
            }

            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async transfermember(req, res) {
        const body = req.body;

        try {
            var msg = 'Cannot transfer this agent!';
            var stats = 0;
            // var data = {};
            if (body.transfer_to == body.transfer_who) {
                msg = "Not applicable! Member cannot transfer to itself.";
            } else {
                const res = await Code.findOne({ where: { icd_agent: body.transfer_to, icd_status: { [Op.lt]: 2 }, status: 0 }, attributes: ["icd_code"] });
                // console.log(res);
                if (res != '') {
                    var newcode = '';
                    if (body.transfer_to == 224) {
                        newcode = '333';
                    } else {
                        newcode = res.icd_code;
                    }
                    // data = {
                    //     iu_partner: body.transfer_to,
                    //     update_datetime: body.datenow,
                    //     real_code: newcode,
                    //     target_partner: body.transfer_who,
                    // }

                    const resdata = await User.update({ iu_partner: body.transfer_to, update_datetime: body.datenow, real_code: newcode }, { where: { iu_partner: body.transfer_who } });
                    console.log(resdata);
                    if (resdata.length > 0) {
                        stats = 1;
                        msg = "Member/s successfully transferred!";
                    } else {
                        msg = "System Error!";
                    }

                } else {
                    msg = "Partner has no active code!";
                }
            }
            res.status(200).json({ message: msg, status: stats });
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

async function bubonsalist() {
    const myquery = "select ia_idx from info_agent where ia_idx IN (select distinct(ia_bonsa) from info_agent) and ia_idx NOT IN (224)";
    const result = await db.query(myquery, { type: QueryTypes.SELECT });
    return result;
}
async function chongpanlist() {
    const myquery = "select a.ia_idx from info_agent as a left join info_agent as b on a.ia_parent=b.ia_idx where a.ia_level = 3 and a.ia_idx NOT IN (224) and a.status=1 UNION select a.ia_idx from info_agent as a left join info_agent as b on a.ia_parent=b.ia_idx where a.ia_parent = 224 and a.ia_idx not in (select ia_bonsa from info_agent where ia_bonsa IS NOT NULL) and a.ia_idx NOT IN (224) and a.status=1";
    const result = await db.query(myquery, { type: QueryTypes.SELECT });
    return result;
}
async function mejanglist() {
    const myquery = "select ia_idx from info_agent where ia_bubonsa IS NOT NULL and status=1 and ia_idx NOT IN (224)";
    const result = await db.query(myquery, { type: QueryTypes.SELECT });
    return result;
}

async function bubonsalist_by_level() {
    const myquery = "select ia_idx from info_agent where ia_level=4";
    const result = await db.query(myquery, { type: QueryTypes.SELECT });
    return result;
}
async function chongpanlist_by_level() {
    const myquery = "select ia_idx from info_agent where ia_level=3";
    const result = await db.query(myquery, { type: QueryTypes.SELECT });
    return result;
}
async function mejanglist_by_level() {
    const myquery = "select ia_idx from info_agent where ia_level=2";
    const result = await db.query(myquery, { type: QueryTypes.SELECT });
    return result;
}

