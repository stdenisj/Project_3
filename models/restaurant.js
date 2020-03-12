
const mongoose = require('./connection.js');
const Schema = mongoose.Schema;


const Restaurant = new Schema({
    name: {
        type: String,
        required: true,
    },
    Location: {
        street: String,
        state: String,
        zipCode: Number,
    },
    image: String,
    description: String,
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
    }
})


module.exports = mongoose.model('Restaurant', Restaurant);
