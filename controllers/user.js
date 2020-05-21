const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.get('/:userName/:password', async(req, res) => {
    try {
        const searchName = req.params.userName;
        const searchPassword = req.params.password;
        let users = await User.find();
        if (users) {
            for (user of users) {
                if( user.userName == searchName && user.password == searchPassword) {
                    if(user.adminStatus === true) {
                        const sentUser = { ...user._doc }
                        sentUser.password = ''
                        res.json(sentUser)  
                    } else {
                        const sentUser = {
                        id: user._id,
                        userName: user._doc.userName,
                        password: '',
                        name: user._doc.name,
                        profileImg: user._doc.profileImg
                    }
                    res.json(sentUser)  
                }
            }
        }} else {
            res.send(alert('Invalid login'));
    }}
    catch (e) {
     res.send(alert('Invalid login'));
    }
});

userRouter.post('/', async(req, res) => {   
    try {
        await User.create(req.body);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
    }
})


userRouter.delete('/:id', async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = { userRouter }