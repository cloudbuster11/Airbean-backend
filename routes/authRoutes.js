const express = require('express');
const { verifySignUp, authJwt, limiters } = require('../middleware');

const authSignController = require('../controllers/authSignController');
const authCreateOrderController = require('../controllers/authCreateOrder');
const authOrdersController = require('../controllers/authOrdersController');

const router = express.Router();

router.post(
  '/auth/signup',
  [limiters.createAccountLimiter, verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authSignController.signup
);

router.post('/auth/signin', [limiters.apiLimiter], authSignController.signin);

router.post('/auth/order', [limiters.apiLimiter, authJwt.verifyToken], authCreateOrderController.createOrder);

router.get(
  '/auth/orderhistory',
  [limiters.apiLimiter, authJwt.verifyToken],
  authOrdersController.getAllUserOrders
);

router.get(
  '/auth/orderstatus/:id',
  [limiters.apiLimiter, authJwt.verifyToken],
  authOrdersController.getOrderStatus
);

module.exports = router;
