const express = require('express');
const { verifySignUp, authJwt } = require('../middleware');

const authController = require('../controllers/authController');
const authCreateOrderController = require('../controllers/authCreateOrder');
const authOrdersController = require('../controllers/authOrdersController');

const router = express.Router();

router.post(
  '/auth/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signup
);

router.post('/auth/signin', authController.signin);

router.post('/auth/order', [authJwt.verifyToken], authCreateOrderController.createOrder);

router.get('/auth/orderhistory', [authJwt.verifyToken], authOrdersController.getAllUserOrders);

router.get('/auth/orderstatus/:id', [authJwt.verifyToken], authOrdersController.getOrderStatus);

module.exports = router;
