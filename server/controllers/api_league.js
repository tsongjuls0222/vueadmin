const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const fs = require('fs');
const { resolve, parse } = require('path');


module.exports = class API {
    static async getevent(req, res) {
        try {
            const myquery = JSON.parse(fs.readFileSync(resolve(__dirname, '../tmpdatajson/activeSports.json'), 'utf8'));
            res.status(200).json(myquery);
            // res.status(200).json({ message: "err.message" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getnation(req, res) {
        try {
            const myquery = "select * from country_sort group by country_title order by country_title asc";
            const result = await db.query(myquery, { type: QueryTypes.SELECT });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getnations(req, res) {
        const id = req.params.id;
        try {
            const myquery = "select a.country_title,a.game_section,a.id,b.num from country_sort as a inner join teams_list b on a.country_code=b.country_code where a.game_section='" + id + "' group by country_title order by country_title asc";
            const result = await db.query(myquery, { type: QueryTypes.SELECT });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getlist(req, res) {
        const body = req.body;
        try {
            var condition = '1=1';
            if (body.sportsid != '' && body.sportsid != 'all') {
                condition += ` and a.sports_id='${body.sportsid}'`;
            }
            if (body.keyword != '') {
                condition += ` and ((a.team_name like '%${body.keyword}%' OR a.team_name_kor like '%${body.keyword}%') OR (a.team_name_new like '%${body.keyword}%' OR a.team_name_kor_new like '%${body.keyword}%') OR (a.team_name = '${body.keyword}' OR a.team_name_kor = '${body.keyword}') OR(a.team_name_new = '${body.keyword}' OR a.team_name_kor_new = '${body.keyword}'))`;
            }
            if (body.country != 'all' && body.country != '') {
                condition += ` and a.country_code='${body.country}'`;
            }
            const myquery = "select *, a.img_file as teamimg, a.country_code as newCountryCode from teams_list as a left join country_sort as b on a.country_code=b.country_code and a.sports_id=b.game_section left join country_code as c on b.country_title=c.kname where " + condition + " order by a.team_name";
            const result = await db.query(myquery, { type: QueryTypes.SELECT });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}