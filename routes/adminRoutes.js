const express = require('express');
const { authJwt } = require('../middleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

// router.route('/auth/signup').post(userController.createUser);

// router.route('/all').get(userController.allAccess);

// router.route('/order').post(beansController.createOrder);

router.get('/admin', [authJwt.verifyToken], adminController.userBoard);

module.exports = router;
