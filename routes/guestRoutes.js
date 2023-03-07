const express = require('express');
const guestOrderController = require('../controllers/guestOrderController');

const router = express.Router();

router.route('/order').post(guestOrderController.createOrder);

router.route('/order/status/:id').get(guestOrderController.getOrderStatus);

module.exports = router;
