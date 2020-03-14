
const mongoose = require('./connection.js');
const Schema = mongoose.Schema;


const Restaurant = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        street: String,
        state: String,
        zipCode: Number,
    },
    website: String,
    image: String,
    description: String,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    }
});


module.exports = mongoose.model('Restaurant', Restaurant);
