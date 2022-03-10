const db = require('../db_config.js');
const { QueryTypes, where } = require('sequelize');
const { Op } = require("sequelize");
const Group = require('../models/macro_group');
const List = require('../models/macro_list');
const Board = require('../models/info_board');

module.exports = class API {
    //group
    static async getgroup(req, res) {
        try {
            const result = await Group.findAll({ order: [['group_sorting', 'asc']] });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async findgroupbyid(req, res) {
        const id = req.params.id;
        try {
            const result = await Group.findByPk(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async addgroup(req, res) {
        const body = req.body;
        const temp = {
            group_name: body.name,
        }
        try {
            const result = await Group.create(temp);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async editgroup(req, res) {
        const body = req.body;
        try {
            const result = await Group.update({ group_name: body.name }, { where: { id: body.id } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async deletegroup(req, res) {
        const id = req.params.id;
        try {
            const result = await Group.destroy({ where: { id: id } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async savestatus(req, res) {
        const body = req.body;
        try {
            const result = await Group.update({ group_status: body.status }, { where: { id: body.target } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async savesortgroup(req, res) {
        const body = req.body;
        console.log(body);
        try {

            for (const item in body) {
                const temp = body[item];
                await Group.update({ group_sorting: temp.group_sorting }, { where: { id: temp.target } });

            }
            res.status(200).json(body);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //list
    static async getlist(req, res) {
        const body = req.body;
        try {
            const result = await List.findAll({ where: { macro_type: body.type }, order: [['macro_sorting', 'asc']] });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async findlistbyid(req, res) {
        const id = req.params.id;
        try {
            const result = await List.findByPk(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async addlist(req, res) {
        const body = req.body;
        const temp = {
            macro_name: body.name,
            macro_type: body.type,
        }
        try {
            const result = await List.create(temp);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async editlist(req, res) {
        const body = req.body;
        try {
            const result = await List.update({ macro_name: body.name }, { where: { id: body.id } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async deletelist(req, res) {
        const id = req.params.id;
        try {
            const result = await List.destroy({ where: { id: id } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async savelist(req, res) {
        const body = req.body;
        try {
            const result = await List.update({ macro_status: body.status }, { where: { id: body.target } });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async savesortlist(req, res) {
        const body = req.body;
        try {
            for (const item in body) {
                const temp = body[item];
                await List.update({ macro_sorting: temp.macro_sorting }, { where: { id: temp.target } });
            }
            res.status(200).json(body);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //forms
    static async getforms(req, res) {
        const body = req.body;
        try {
            var condition = '';
            if (body.type == "form") { condition = ` a.ibd_type = 'form' and a.ibd_idx <= 10`; }
            else { condition = ' a.ibd_type = "badform"'; }

            const myquery = "SELECT * from info_board as a left join info_account as b on a.ibd_writer=b.id where" + condition + " order by a.ibd_idx asc";
            const result = await db.query(myquery, { type: QueryTypes.SELECT });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async addforms(req, res) {
        const body = req.body;
        console.log(body);
        try {
            const result = await Board.create(body);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async getformsid(req, res) {
        const id = req.params.id;
        try {
            const result = await Board.findByPk(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async editforms(req, res) {
        const body = req.body;
        const id = req.body.ibd_idx
        try {
            const result = await Board.update(
                {
                    ibd_contents: body.ibd_contents,
                    ibd_writer: body.ibd_writer,
                    ibd_title: body.ibd_title,
                    form_group: body.form_group,
                    ibd_type: body.ibd_type,
                },
                {
                    where: {
                        ibd_idx: id
                    }
                }
            );
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}