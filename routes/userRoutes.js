const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch('/updatemypassword', authController.protect, authController.updatePassword);
router.patch('/updateme', authController.protect, userController.updateMe);
router.delete('/deleteme', authController.protect, userController.deleteMe);

router.get('/history', authController.protect, userController.getUserOrderHistory);

router.post('/order', authController.protect, userController.createOrder);

router.get('/orderstatus/:id', authController.protect, userController.getOrderStatus);

// Flyttas till admin
router.route('/').get(userController.getAllUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
