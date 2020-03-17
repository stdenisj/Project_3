const mongoose = require('./connection.js');
const Schema = mongoose.Schema;

const User = new Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    profileImg: {
        type: String,
        default: "https://st3.depositphotos.com/6672868/14376/v/450/depositphotos_143767633-stock-illustration-user-profile-group.jpg",
    },
    adminStatus: {
        type: Boolean,
        default: 'false'
    }
});

module.exports = mongoose.model('User', User)