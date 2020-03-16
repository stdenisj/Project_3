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
    profileImg: String,
    adminStatus: {
        type: Boolean,
        default: 'false'
    }
});

module.exports = mongoose.model('User', User)