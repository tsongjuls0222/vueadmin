const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');


module.exports = class API {
    static async getpartnertree(req, res) {
        try {
            var masterid = '224';
            var tree = await getmasterdata(masterid)
            const geteachdata = () => {
                const getdata = "SELECT ia_idx,ia_balance,ia_fee,ia_loosing,ia_rate,ia_status,ia_name,ia_code from info_agent order by ia_idx";
                const getchildcount = "SELECT count(ia_idx) as counter from info_agent where ia_parent =" + masterid + " and status = 1";
            }

            // const result = db.query(myquery, {
            //     type: QueryTypes.SELECT
            // });
            res.status(200).json(tree);
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
    const resagentcount = db.query(getagentchildcount, { type: QueryTypes.SELECT });
    const agentcount = resagentcount;
    const resusercount = db.query(getuserchildcount, { type: QueryTypes.SELECT });
    const usercount = resusercount;
    for (var count = 0; count < resagentdata.length; count++) {
        var body = resagentdata[count];
        tree = {
            'key': body.ia_idx,
            'title': body.ia_name + '(' + body.ia_code + ')',
            'balance': body.ia_balance,
            'fee': body.ia_fee,
            'rate': body.ia_rate,
            'loosing': body.ia_loosing,
            'status': body.ia_status,
            'member': usercount[0],
            'folder': agentcount[0],
            'expanded': true,
            'children': {}
        }
    }

    return tree;

    // return resagentdata;
}




