const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/allorders',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.getAllOrders
);

router.get('/menu', authController.protect, authController.restrictTo('admin'), adminController.getMenu);

router.post('/menu', authController.protect, authController.restrictTo('admin'), adminController.addToMenu);

router.patch(
  '/menu/:id',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.updateMenu
);

router.delete(
  '/menu/:id',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.deleteProduct
);

module.exports = router;
