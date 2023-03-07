const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

router.route('/').get(menuController.getAllProducts);

module.exports = router;
