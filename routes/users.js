const express = require('express')
const router = express.Router();
const User = require("../model/User");
const Post = require("../model/Post");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js")
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY
const { verifyToken } = require('../middleware/authBearerToken');

// Get User by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get All Users
router.get("/", async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            message: "All Users retrieved Successfully!",
            users
        });
    } catch(err) {
        res.status(500).json(err)
    }
});

// Update User By ID
router.put("/:id", verifyToken, async (req, res)=> {
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, PASSWORD_SECRET_KEY).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});
            res.status(200).json({
                message: "User has been updated!",
                updatedUser
            });
        } catch (err) {
            res.status(500).json(err);
        }
});


// Delete User and User's Posts
router.delete("/:id", verifyToken, async (req, res)=> {
        try {
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User and Post(s) have been deleted!");
        } catch (err) {
            res.status(500).json(err);
         }
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router