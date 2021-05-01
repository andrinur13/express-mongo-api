const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;

const genreSchema = new mongoose.Schema({
    genreName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Genre', genreSchema);