const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    const inputUser = req.body.inputuser;
    const inputPassword = req.body.inputPassword;
    User.find( { userName: inputUser }, { password: inputPassword }).then( (user) => {
        res.json(user);
    });
});

userRouter.post('/', (req, res) => {
    User.create(req.body).then( () => { res.status(200).end()})
})


userRouter.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then( () => res.status(200).end() );
})

module.exports = { userRouter }