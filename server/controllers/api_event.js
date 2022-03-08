const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const popups = require('../models/popup');
const Board = require('../models/info_board');
const fs = require('fs');

module.exports = class API {
    static async getpopup(req, res) {
        try {
            const popup = await popups.findAll();
            res.status(200).json(popup);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async setpopupstatus(req, res) {
        const body = req.body;
        try {
            const popup = await popups.update(
                {
                    status: body.status
                },
                {
                    where: {
                        id: body.target
                    }
                }
            );
            res.status(200).json(popup);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async addPopup(req, res) {
        const body = req.body;
        const imagename = req.file.filename;
        body.content = imagename;
        try {
            const temp = await popups.create(body);
            res.status(201).json({ message: 'added' });
        } catch (error) {
            res.status(400).json({ message: 'Error in insert new record' });
        }
    }

    static async findPopup(req, res) {
        const id = req.params.id;
        try {
            const temp = await popups.findByPk(id);
            res.status(200).json(temp);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async editPopup(req, res) {
        const id = req.params.id;
        const body = req.body;
        const imagename = req.file.filename;
        const temp = await popups.findByPk(id);
        if (temp.content) {
            try {
                fs.unlinkSync('./uploads/popup/' + temp.content);
            } catch (err) {
                console.log(err);
            }
        }
        body.content = imagename;
        try {
            await popups.update({
                popup_title: body.popup_title,
                content: body.content,
                widthpx: body.widthpx,
                heightpx: body.heightpx,
            }, { where: { id: id } });
            res.status(200).json({ message: 'updated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deletePopup(req, res) {
        const id = req.params.id;
        try {
            const result = await popups.findByPk(id);
            if (result.content != '') {
                try {
                    fs.unlinkSync('./uploads/popup/' + result.content);
                } catch (error) {
                    console.log(error);
                }
            }
            await popups.destroy({ where: { id: id } });
            res.status(200).json({ message: 'deleted' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // notice

    static async getNotice(req, res) {
        try {
            const result = await Board.findAll(
                {
                    where:
                    {
                        ibd_type: 'notice',
                        ibd_idx: { [Op.notIn]: [262, 250, 208, 207, 201, 107, 106, 105, 91, 89, 87, 85, 83, 81, 79, 77, 75, 73] }
                    },
                    order: [
                        ['sort_julius', 'asc']
                    ]
                },
            );
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}