const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const { checkUserId } = require('../utils');

router.use(authController.protect);

router.get('/checkout-session/', orderController.getCheckoutSession);
// router.post('/checkout-session-completed/', orderController.createOrderCheckout);

router.get('/order-history', orderController.getOrderHistory);
router.get('/orderstatus/:id', orderController.getOrderStatus);

router.use(authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
