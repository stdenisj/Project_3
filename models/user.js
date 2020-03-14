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
        required: true,
    },
    adminStatus: Boolean,
});

module.exports = mongoose.model('User', User)