const Account = require("../models/account");
const jwt = require('jsonwebtoken');

module.exports = class API {
    static async getToken(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            let user = await Account.findOne({ where: { username: username } });

            if (user === null) {
                res.json({
                    message: "Username is not EXIST!"
                })
            }
            else {
                let account = await Account.findOne({ where: { username: username, password: password } });
                if (account === null) {
                    res.json({
                        message: "Password is WRONG!"
                    })
                }
                else {
                    jwt.sign({ user }, 'secretkey', (err, token) => {
                        res.json({
                            message: "OK",
                            userinfo: {
                                user: account,
                                token: token
                            }

                        });
                    });
                }
            }

        } catch (error) {
            res.json({ message: error.message })
        }
    }
    // static async setToken(req, res){
    //     jwt.verify(req.token, 'secretkey', (err, authData) => {
    //         if(err){
    //             res.json({
    //                 message: "API Error"
    //             });
    //         }
    //         else{
    //             res.json({
    //                 message: "Post Created",
    //                 authData
    //             })
    //         }
    //     });
    // }
}