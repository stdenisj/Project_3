const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.get('/:userName/:password', (req, res) => {
    const searchName = req.params.userName
    const searchPassword = req.params.password
    User.find().then( (users) => {
        for (user of users) {
            if( user.userName == searchName && user.password == searchPassword) {
                if(user.adminStatus === true) {
                    const sentUser = { ...user._doc }
                    sentUser.password = ''
                    res.json(sentUser)  
                } else {
                    const sentUser = {
                    userName: user._doc.userName,
                    password: '',
                    name: user._doc.name,
                    profileImg: user._doc.profileImg
                }
                res.json(sentUser)  
            }
        }}
    }).catch( (e) => console.log(e))
});

userRouter.post('/', (req, res) => {   
    User.create(req.body).then( () => { res.status(200).end()})
})


userRouter.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then( () => res.status(200).end() );
})

module.exports = { userRouter }