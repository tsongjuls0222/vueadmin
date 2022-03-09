const db = require('../db_config.js');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const popups = require('../models/popup');
const Board = require('../models/info_board');
const Reward = require('../models/rewards');
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
                fs.unlinkSync('./upload/team_icon/' + temp.content);
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
                    fs.unlinkSync('./upload/team_icon/' + result.content);
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

    static async findNoticeById(req, res) {
        const id = req.params.id;
        try {
            const temp = await Board.findByPk(id);//findOne({ where: { ibd_idx: id } });
            console.log(temp);
            res.status(200).json(temp);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async addNotice(req, res) {
        const body = req.body;
        const imagename = req.file.filename;
        body.ibd_contents = imagename;
        try {
            const temp = await Board.create(body);
            res.status(201).json({ message: 'added notice' });
        } catch (error) {
            res.status(400).json({ message: 'Error in insert new record' });
        }
    }

    static async editNotice(req, res) {
        const id = req.params.id;
        const body = req.body;
        const imagename = req.file.filename;
        const temp = await Board.findByPk(id);
        if (temp.ibd_contents) {
            try {
                fs.unlinkSync('./upload/team_icon/' + temp.ibd_contents);
            } catch (err) {
                console.log(err);
            }
        }
        body.ibd_contents = imagename;
        try {
            await Board.update({
                ibd_title: body.ibd_title,
                ibd_contents: body.ibd_contents,
                ibd_status: body.ibd_status,
                ibd_type: body.ibd_type,
                ibd_fix: body.ibd_fix,
                ibd_titlecolor: body.ibd_titlecolor,
            }, { where: { ibd_idx: id } });
            res.status(200).json({ message: 'updated notice' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteNotice(req, res) {
        const id = req.params.id;
        try {
            const result = await Board.findByPk(id);
            if (result.ibd_contents != '') {
                try {
                    fs.unlinkSync('./upload/team_icon/' + result.ibd_contents);
                } catch (error) {
                    console.log(error);
                }
            }
            await Board.destroy({ where: { ibd_idx: id } });
            res.status(200).json({ message: 'deleted' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async setNoticeStatus(req, res) {
        const body = req.body;
        try {
            const popup = await Board.update(
                {
                    ibd_status: body.status
                },
                {
                    where: {
                        ibd_idx: body.target
                    }
                }
            );
            res.status(200).json(popup);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async savesorting(req, res) {
        const body = req.body;
        try {
            for (const item in body) {
                const temp = body[item];
                await Board.update({ sort_julius: temp.sort_julius }, { where: { ibd_idx: temp.target } });
            }

            res.status(200).json(body);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //board
    static async getBoard(req, res) {
        try {
            const myquery = "Select * from info_board  as a left join info_account as b on b.id=a.ibd_writer where a.ibd_type='event' and a.ibd_idx NOT IN (172, 171, 170, 169) or a.ibd_type='popup' and a.ibd_idx NOT IN (172, 171, 170, 169) order by a.sort_julius asc";

            const result = await db.query(myquery, {
                type: QueryTypes.SELECT
            });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async findBoardById(req, res) {
        const id = req.params.id;
        try {
            const temp = await Board.findByPk(id);//findOne({ where: { ibd_idx: id } });
            console.log(temp);
            res.status(200).json(temp);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async addBoard(req, res) {
        const body = req.body;
        const imagename1 = req.files.ibd_contents[0].filename;
        const imagename2 = req.files.ibd_thumbnail[0].filename;
        body.ibd_contents = imagename1;
        body.ibd_thumbnail = imagename2;
        try {
            const temp = await Board.create(body);
            res.status(201).json({ message: 'added Board' });
        } catch (error) {
            res.status(400).json({ message: 'Error in insert new record' });
        }
    }

    static async editBoard(req, res) {
        const id = req.params.id;
        const body = req.body;
        const imagename1 = req.files.ibd_contents[0].filename;
        const imagename2 = req.files.ibd_thumbnail[0].filename;


        const temp = await Board.findByPk(id);
        if (temp.ibd_contents && temp.ibd_thumbnail) {
            try {
                fs.unlinkSync('./upload/team_icon/' + temp.ibd_contents);
                fs.unlinkSync('./upload/team_icon/' + temp.ibd_thumbnail);
            } catch (err) {
                console.log(err);
            }
        }
        body.ibd_contents = imagename1;
        body.ibd_thumbnail = imagename2;
        try {
            await Board.update({
                ibd_title: body.ibd_title,
                ibd_contents: body.ibd_contents,
                ibd_thumbnail: body.ibd_thumbnail,
                ibd_status: body.ibd_status,
                ibd_type: body.ibd_type,
                ibd_fix: body.ibd_fix,
                ibd_titlecolor: body.ibd_titlecolor,
            }, { where: { ibd_idx: id } });
            res.status(200).json({ message: 'updated Board' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteBoard(req, res) {
        const id = req.params.id;
        try {
            const result = await Board.findByPk(id);
            if (result.ibd_contents != '' && result.ibd_thumbnail) {
                try {
                    fs.unlinkSync('./upload/team_icon/' + result.ibd_contents);
                    fs.unlinkSync('./upload/team_icon/' + result.ibd_thumbnail);
                } catch (error) {
                    console.log(error);
                }
            }
            await Board.destroy({ where: { ibd_idx: id } });
            res.status(200).json({ message: 'deleted Board' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async setBoardStatus(req, res) {
        const body = req.body;
        try {
            const popup = await Board.update(
                {
                    ibd_status: body.status
                },
                {
                    where: {
                        ibd_idx: body.target
                    }
                }
            );
            res.status(200).json(popup);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //attendance
    static async getrewards(req, res) {
        try {
            const popup = await Reward.findAll();
            res.status(200).json(popup);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async saverewards(req, res) {
        const body = req.body;
        try {
            const result = await Reward.update(
                {
                    lvl1_seven: body.lvl1_seven,
                    lvl1_fifteen: body.lvl1_fifteen,
                    lvl1_thirty: body.lvl1_thirty,
                },
                {
                    where: { id: 1 }
                }
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}