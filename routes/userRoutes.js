const express = require('express');
const { authJwt, limiters } = require('../middleware');

const userCreateOrderController = require('../controllers/userCreateOrderController');
const userOrdersController = require('../controllers/userOrdersController');

const router = express.Router();

router.post('/order', [limiters.apiLimiter, authJwt.verifyToken], userCreateOrderController.createOrder);

router.get(
  '/orderhistory',
  [limiters.apiLimiter, authJwt.verifyToken],
  userOrdersController.getAllUserOrders
);

router.get(
  '/orderstatus/:id',
  [limiters.apiLimiter, authJwt.verifyToken],
  userOrdersController.getOrderStatus
);

module.exports = router;
