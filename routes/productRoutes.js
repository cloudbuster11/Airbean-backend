const express = require('express');
const productController = require('../controllers/productController');
const reviewRouter = require('../routes/reviewRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

// Skickar vidare till reviewRouter Matchar ###
router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(authController.protect, authController.restrictTo('admin'), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(authController.protect, authController.restrictTo('admin'), productController.updateProduct)
  .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct);

module.exports = router;
