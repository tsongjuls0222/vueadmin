const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const fs = require('fs');
const { resolve, parse } = require('path');
const Teams = require('../models/teams_list');
const League = require('../models/league_list');
const Country = require('../models/country_sort');
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
            const myquery = JSON.parse(fs.readFileSync(resolve(__dirname, '../tmpdatajson/activeSports.json'), 'utf8'));
            var sendData = [];
            for (const key in myquery) {
                const element = myquery[key];
                const qwekqwek = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = " + element.game_section + " group by country_code order by sort_num asc";
                const result = await db.query(qwekqwek, { type: QueryTypes.SELECT });
                sendData.push({ row: element, data: result });
            }
            res.status(200).json(sendData);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getleagues(req, res) {
        const body = req.body;
        try {
            var result = null;
            if (body.type == 'live') {
                result = await League.findAll({ where: { game_code: body.game_code, reg_countycode: body.reg_countrycode }, order: [['league_sorts', 'asc']] });
            } else {
                result = await League.findAll({ where: { game_code: body.game_code, reg_countycode: body.reg_countrycode }, order: [['league_sort', 'asc']] });
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async setleaguename(req, res) {
        const body = req.body;
        try {
            var updateData = {};
            if (body.type == "live") {
                updateData = { leagu_names: body.leagu_name };
            } else {
                updateData = { leagu_name: body.leagu_name };
            }
            const result = await League.update(updateData, { where: { game_code: body.game_code, reg_countycode: body.reg_countrycode, leagu_id: body.leagu_id } });
            res.status(200).json({ message: 'successfully updated' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async setcountryname(req, res) {
        const body = req.body;
        try {
            var updateData = {};
            if (body.type == "live") {
                updateData = { country_titles: body.country_title };
            } else {
                updateData = { country_title: body.country_title };
            }
            const result = await Country.update(updateData, { where: { game_section: body.game_code, country_code: body.country_code } });
            res.status(200).json({ message: 'successfully updated' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async setleaguebox(req, res) {
        const body = req.body;
        try {
            var updateData = {};
            if (body.type == "live") {
                updateData = { statuss: body.status };
            } else {
                updateData = { status: body.status };
            }
            const result = await League.update(updateData, { where: { game_code: body.game_code, reg_countycode: body.country_code, leagu_id: body.leagu_id } });
            res.status(200).json({ message: 'successfully updated' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async setcountrybox(req, res) {
        const body = req.body;
        try {
            var updateData = {};
            if (body.type == "live") {
                updateData = { statuss: body.status };
            } else {
                updateData = { status: body.status };
            }
            const result = await Country.update(updateData, { where: { game_section: body.game_code, country_code: body.country_code } });
            res.status(200).json({ message: 'successfully updated' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async setleaguesort(req, res) {
        const body = req.body;
        try {
            for (var key in body) {
                const element = body[key];
                var updateData = {};
                if (element.type == "live") {
                    updateData = { league_sorts: element.sort };
                } else {
                    updateData = { league_sort: element.sort };
                }
                const result = await League.update(updateData, { where: { game_code: element.game_code, reg_countycode: element.country_code, leagu_id: element.leagu_id } });
            }

            res.status(200).json({ message: 'successfully updated' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async setcountrysort(req, res) {
        const body = req.body;
        try {
            for (var key in body) {
                const element = body[key];
                var updateData = {};
                if (element.type == "live") {
                    updateData = { sort_nums: element.sort };
                } else {
                    updateData = { sort_num: element.sort };
                }
                const result = await Country.update(updateData, { where: { game_section: element.game_code, country_code: element.country_code } });
            }

            res.status(200).json({ message: 'successfully updated' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async countryupload(req, res) {
        const body = req.body;
        const file = req.file;
        console.log(body);
        try {
            var stats = 0;
            var msg = '';
            var seetrue = true;

            if ((file !== null && file !== undefined && file !== '')) {
                if (file.size > 1024 * 1024 * 2) {
                    msg = 'File too large';
                    seetrue = false;
                    try {
                        fs.unlinkSync('./upload/country_icon/' + file.filename);
                    } catch (error) {
                        msg = error;
                    }
                }
                if (!(file.mimetype.includes('jpeg')) && !(file.mimetype.includes('png')) && !(file.mimetype.includes('jpg'))) {
                    msg = "File not supported";
                    seetrue = false;
                    try {
                        fs.unlinkSync('./upload/country_icon/' + file.filename);
                    } catch (error) {
                        msg = error;
                    }
                }
            }

            if (seetrue) {
                body.img_file = file.filename;
                var updateData = {};
                if (body.type == "live") {
                    updateData = { img_files: body.img_file };
                } else {
                    updateData = { img_file: body.img_file };
                }
                const result = await Country.update(updateData,
                    {
                        where: {
                            game_section: body.game_section,
                            country_code: body.country_code,
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
    static async getliveleaguesorting(req, res) {
        try {
            const myquery = JSON.parse(fs.readFileSync(resolve(__dirname, '../tmpdatajson/liveActiveSports.json'), 'utf8'));
            var sendData = [];
            for (const key in myquery) {
                const element = myquery[key];
                const qwekqwek = "SELECT * FROM country_sort as a left join country_code as b on b.kname=a.country_title where game_section = " + element.game_section + " group by country_code order by sort_nums asc";
                const result = await db.query(qwekqwek, { type: QueryTypes.SELECT });
                sendData.push({ row: element, data: result });
            }
            res.status(200).json(sendData);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}