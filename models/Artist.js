const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;
const User = require('./Users');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: User
}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', usersSchema);