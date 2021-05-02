const multer = require("multer");
const path = require("path");

const storageSong = multer.diskStorage({
    destination: 'public/tracks',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadSong = multer({
    storage: storageSong
}).single('song');

module.exports = { uploadSong };