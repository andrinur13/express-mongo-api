var express = require('express');
var router = express.Router();
const genreControllers = require('../controllers/GenreControllers');
const userControllers = require('../controllers/UserControllers');

router.post('/genre', genreControllers.addGenre);
router.get('/genre', userControllers.validateToken, genreControllers.listGenre);

module.exports = router;
