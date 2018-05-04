const express = require('express');
const router = express.Router();
const MovieCtrl=require('../controllers')

router.get('/movie',MovieCtrl.searchMovies)
router.get('/movie/:id',MovieCtrl.getLocations)

module.exports = router;