const Account = require("../models/account");
const jwt = require('jsonwebtoken');

module.exports = class API {
    //fetch all posts
    static async fetchAllPost(req, res){
        try {
            const accounts = await Account.findAll();
            res.status(200).json(accounts);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async fetchUser(req, res){
        const user = req.body.username;
        const pass = req.body.password;
        try {
            const accounts = await Account.findOne({ where: {username: user, password: pass} });
            res.status(200).json({ id: accounts.id });

        } catch (error) {
            res.json({message : "mali tayo"})
        }
    }

    // static async fetchUser(req, res){
    //     try {
    //         const user = req.params.username;
    //         const pass = req.params.password;
    //         const accounts = await Account.findOne({ where: {username: user, password: pass} });
    //         res.status(200).json({ id: accounts.id});
    //     } catch (error) {
    //         res.status(404).json({ id: 0});
    //     }
    // }

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

    static async sampletoken(req, res){
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err){
                res.sendStatus(403);
            }
            else{
                res.json({
                    message: "Post Created",
                    authData
                })
            }
        });
    }

    static async sampletokenlogin(req, res){
        const user = {
            id: 1,
            username: 'brad',
            email: 'brad@gmail.com'
        }
        
        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
                token
            });
        });
    }

}