const mongoose = require('mongoose');
const {objectId} = mongoose.Schema;

const tracksSchema = new mongoose.Schema({
    track_name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre_id: {
        type: 'objectId',
        required: true
    },
    artist_id: {
        type: 'objectId',
        required: true
    },
    file_path: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Track', tracksSchema);