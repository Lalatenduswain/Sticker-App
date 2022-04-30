const User = require('../models/user');
const {uploader} = require('../utils/emailAndStorage');
const jwt = require("jsonwebtoken");

exports.index = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({users});
};

exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) 
            return res.status(401).json({message: 'User does not exist'});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.updateDetails = async (req, res) => {
    try {
        const {name,firstName, lastName}=req.body;
        const token = req.header("Authorization");
        if (!token)
            return res.status(401).json({
                message: "Token Unavailable",
            });
        const finalToken = token.split(" ")[1];
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verified.id });
        let userID;
        if (user) {
            userID = user._id;
            // console.log(userID);
        } else {
            return res.status(400).json({
                message: "User not found",
            });
        }
        if(name === '' || firstName === '' || lastName === ''){
            res.status(404).json({
                message: "Please fill out all the fields"
            })
        }
        const userNew = await User.findOneAndUpdate(
        { _id: userID },
            {
                $set: { username:name, firstName, lastName },
            }
        );
        res.status(200).json({ message: "User has been updated Successfully"})
    } catch (err) {
        res.json(err);
    }
};
