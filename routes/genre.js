var express = require('express');
var router = express.Router();
const genreControllers = require('../controllers/GenreControllers');
const userControllers = require('../controllers/UserControllers');

router.post('/genre', userControllers.validateToken, genreControllers.addGenre);
router.get('/genre', genreControllers.listGenre);

module.exports = router;
