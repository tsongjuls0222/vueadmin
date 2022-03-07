const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const popups = require('../models/popup');

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
        // console.log(req.body);
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
            res.status(202).json({ message: req.body });
        }
    }
}