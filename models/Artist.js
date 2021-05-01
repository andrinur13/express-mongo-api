const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;
// const User = require('./Users');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);