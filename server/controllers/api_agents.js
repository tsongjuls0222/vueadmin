const Agent = require("../models/agent");
const Code = require("../models/code");
const { Op } = require("sequelize");

module.exports = class API {

    //fetch all agent sith status 1
    static async fetchAllMemberListSelect1(req, res){
        try {
            var agents = await Agent.findAll({ 
                where: {
                    status: 1
                },
                order: [
                    ['ia_level', 'DESC']
                ],
                attributes: ['ia_idx', 'ia_name', 'ia_level']
            });
            res.status(200).json(agents);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    //fetch all agent code
    static async fetchAllMemberListSelect2(req, res){
        try {
            const codes = await Code.findAll({ 
                where: {
                    status: {
                        [Op.lt]: 2 
                    }
                },
                order: [
                    ['icd_idx', 'DESC']
                ]
            });
            res.status(200).json(codes);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async fetchAllMemberListSelect3(req, res){
        try {
            var arrdata = [];

            for(var i = 1; i < 11; i++){
                const data = {
                    "id" : i,
                    "option" : "레벨 "+i
                }

                arrdata.push(data);
            }
            res.status(200).json(arrdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async fetchAllMemberListSelect4(req, res){
        try {
            const arrdata = [
                {
                    "id" : "-1",
                    "option" : "회원유형"
                },
                {
                    "id" : "1",
                    "option" : "정상유저"
                },
                {
                    "id" : "2",
                    "option" : "의심유저"
                },
                {
                    "id" : "3",
                    "option" : "불량유저"
                },
                {
                    "id" : "4",
                    "option" : "기타유저"
                },
                {
                    "id" : "5",
                    "option" : "장기미접"
                },
                {
                    "id" : "6",
                    "option" : "정지유저"
                },
                {
                    "id" : "7",
                    "option" : "테스트아이디"
                }
            ];
            res.status(200).json(arrdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async fetchAllMemberListSelect5(req, res){
        try {
            const arrdata = [
                {
                    "id" : "1",
                    "option" : "아이디",
                    "value" : "a.username"
                },
                {
                    "id" : "2",
                    "option" : "닉네임",
                    "value" : "a.iu_nickname"
                },
                {
                    "id" : "3",
                    "option" : "이름",
                    "value" : "a.iu_name"
                },
                {
                    "id" : "4",
                    "option" : "연락처",
                    "value" : "a.iu_phone"
                },
                {
                    "id" : "5",
                    "option" : "계좌번호",
                    "value" : "a.iu_acc"
                },
                {
                    "id" : "6",
                    "option" : "코드",
                    "value" : "a.real_code"
                },
                {
                    "id" : "7",
                    "option" : "파트너",
                    "value" : "b.ia_name"
                },
                {
                    "id" : "8",
                    "option" : "추천인",
                    "value" : "a.iu_recommend"
                }
            ];
            res.status(200).json(arrdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // //fetch post by id
    // static async fetchPostByID(req, res){
    //     const id = req.params.id;
    //     try {
    //         const post = await Post.findById(id);
    //         res.status(200).json(post);
    //     } catch (error) {
    //         res.status(404).json({ message: error.message });
    //     }
    // }

    // //create a post
    // static async createPost(req, res){
    //     const post = req.body;
    //     const imagename = req.file.filename;
    //     post.image = imagename;
    //     try {
    //         await Post.create(post);
    //         res.status(201).json({ message: "Post created successfully!" });
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }

    // //update a post
    // static async updatePost(req, res){
    //     const id = req.params.id;
    //     let new_image = '';
    //     if(req.file){
    //         new_image = req.file.filename;
    //         try {
    //             fs.unlinkSync('./uploads/'+res.body.old_image);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         new_image = req.body.old_image;
    //     }

    //     const newPost = req.body;
    //     newPost.image = new_image;

    //     try {
    //         await Post.findByIdAndUpdate(id, newPost);
    //         res.status(200).json({ message: 'Post updated successfully!' });
    //     } catch (error) {
    //         res.status(404).json({ message: error.message });
    //     }
    // }

    // //delete a post
    // static async deletePost(req, res){
    //     const id = req.params.id;
    //     try {
    //         const result = await Post.findByIdAndDelete(id);
    //         if(result.image != ''){
    //             try {
    //                 fs.unlinkSync('./uploads/'+result.image);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         res.status(200).json({ message : "Post deleted successfully!" });
    //     } catch (error) {
    //         res.status(404).json({ message : error.message });
    //     }
    // }

}