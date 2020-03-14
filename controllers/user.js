const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.get('/:userName/:password', (req, res) => {
    const searchName = req.params.userName
    const searchPassword = req.params.password
    User.find().then( (users) => {
        for (user of users) {
            if( user.userName == searchName && user.password == searchPassword) {
                const sentUser = { ...user._doc }
                sentUser.password = ''
                res.json(sentUser)  
            } else {
            } 
        }
    }).catch( (e) => console.log(e))
});

userRouter.post('/', (req, res) => {   
    User.create(req.body).then( () => { res.status(200).end()})
})


userRouter.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then( () => res.status(200).end() );
})

module.exports = { userRouter }