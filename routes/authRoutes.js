const express = require('express');
const { verifySignUp, authJwt } = require('../middleware');

const authSignController = require('../controllers/authSignController');
const authCreateOrderController = require('../controllers/authCreateOrder');
const authOrdersController = require('../controllers/authOrdersController');

const router = express.Router();

router.post(
  '/auth/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authSignController.signup
);

router.post('/auth/signin', authSignController.signin);

router.post('/auth/order', [authJwt.verifyToken], authCreateOrderController.createOrder);

router.get('/auth/orderhistory', [authJwt.verifyToken], authOrdersController.getAllUserOrders);

router.get('/auth/orderstatus/:id', [authJwt.verifyToken], authOrdersController.getOrderStatus);

module.exports = router;
