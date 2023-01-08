// importing express
const express = require('express');
// setting up router
const router = express.Router();

// setting up the route for home controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);


// exporting router to be used by index.js in working directory
module.exports = router;