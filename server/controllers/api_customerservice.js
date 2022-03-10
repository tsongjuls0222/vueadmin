const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const Group = require('../models/macro_group');
const List = require('../models/macro_list');

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
}