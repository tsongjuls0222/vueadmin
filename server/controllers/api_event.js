const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const popups = require('../models/popup');

module.exports = class API {
    static async getpopup() {
        try {
            const popup = await popups.findAll();
            res.status(200).json(popup);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}