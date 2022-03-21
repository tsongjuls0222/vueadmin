const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const fs = require('fs');
const { resolve, parse } = require('path');
const Teams = require('../models/teams_list');
const { type } = require('os');


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
    static async setrow(req, res) {
        const body = req.body;
        const file = req.file;
        // console.log(body);
        try {
            var stats = 0;
            var msg = '';
            var seetrue = true;


            if (body.enname == '' || body.korname == '') {
                msg = 'Fields cannot be empty';
                seetrue = false;

            }
            if ((file !== null && file !== undefined && file !== '')) {
                if (file.size > 1024 * 1024 * 2) {
                    msg = 'File too large';
                    seetrue = false;
                    try {
                        fs.unlinkSync('./upload/team_icon/' + file.filename);
                    } catch (error) {
                        msg = error;
                    }
                }
                if (!(file.mimetype.includes('jpeg')) && !(file.mimetype.includes('png')) && !(file.mimetype.includes('jpg'))) {
                    msg = "File not supported";
                    seetrue = false;
                    try {
                        fs.unlinkSync('./upload/team_icon/' + file.filename);
                    } catch (error) {
                        msg = error;
                    }
                }
            }

            if (seetrue) {
                // const res = await Teams.findByPk(body.num);
                // if (res.bank_image) {
                //     try {
                //         fs.unlinkSync('./upload/team_icon/' + result.img_file);
                //     } catch (error) {
                //         // console.log(error);
                //         msg = error;
                //     }
                // }
                var updateData = {};
                if (file !== null && file !== undefined && file !== '') {
                    const checkteam = await Teams.findOne({ where: { team_id: body.team_id, sports_id: body.sports_id }, attribtes: ['num'] });
                    if (checkteam == '') {
                        await Teams.create({
                            team_name_new: body.enname,
                            team_name_kor_new: body.korname,
                            edited: 0,
                            sports_id: body.sports_id,
                            country: body.country,
                            team_name: body.enname,
                            team_name_kor: body.korname,
                            team_id: body.country_id,
                            country_code: body.country_id,
                            img_file: null,
                        });
                    }
                    body.img_file = file.filename;
                    updateData = {
                        team_name_new: body.enname,
                        team_name_kor_new: body.korname,
                        edited: 1,
                        img_file: body.img_file,
                    }
                } else {
                    updateData = {
                        team_name_new: body.enname,
                        team_name_kor_new: body.korname,
                        edited: 1,
                    }
                }

                const result = await Teams.update(updateData,
                    {
                        where: {
                            country_code: body.country_id,
                            sports_id: body.sports_id,
                            team_id: body.team_id,
                        }
                    }
                );

                if (result.length > 0) {
                    stats = 1;
                    msg = "Successfully Updated";
                }
            }
            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async deleteimage(req, res) {
        const body = req.body;
        console.log(body);
        try {
            var stats = 0;
            var msg = 'Something went wrong';
            const result = await Teams.update({ img_file: null }, { where: { team_id: body.team_id, sports_id: body.sports_id } });
            if (result.length > 0) {
                stats = 1;
                msg = "Image Deleted";
            }
            res.status(200).json({ message: msg, status: stats });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getleaguesorting(req, res) {
        try {
            const soccer = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 1 group by country_code order by sort_num asc";
            const baseball = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 16 group by country_code order by sort_num asc";
            const basketball = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 18 group by country_code order by sort_num asc";
            const volleyball = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 91 group by country_code order by sort_num asc";
            const icehockey = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 17 group by country_code order by sort_num asc";
            const football = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 12 group by country_code order by sort_num asc";
            const esports = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 151 group by country_code order by sort_num asc";
            const handball = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 78 group by country_code order by sort_num asc";
            const tennis = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 13 group by country_code order by sort_num asc";
            const pingpong = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = 2004 group by country_code order by sort_num asc";

            const ressoccer = await db.query(soccer, { type: QueryTypes.SELECT });
            const resbaseball = await db.query(baseball, { type: QueryTypes.SELECT });
            const resbasketball = await db.query(basketball, { type: QueryTypes.SELECT });
            const resvolleyball = await db.query(volleyball, { type: QueryTypes.SELECT });
            const resicehockey = await db.query(icehockey, { type: QueryTypes.SELECT });
            const resfootball = await db.query(football, { type: QueryTypes.SELECT });
            const resesports = await db.query(esports, { type: QueryTypes.SELECT });
            const reshandball = await db.query(handball, { type: QueryTypes.SELECT });
            const restennis = await db.query(tennis, { type: QueryTypes.SELECT });
            const respingpong = await db.query(pingpong, { type: QueryTypes.SELECT });

            const sendData = {
                soccer: ressoccer,
                baseball: resbaseball,
                basketball: resbasketball,
                volleyball: resvolleyball,
                icehockey: resicehockey,
                football: resfootball,
                esports: resesports,
                handball: reshandball,
                tennis: restennis,
                pingpong: respingpong,
            }
            res.status(200).json(sendData);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}