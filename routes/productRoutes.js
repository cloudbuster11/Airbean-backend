const express = require('express');
const productController = require('../controllers/productController');
const reviewRouter = require('../routes/reviewRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

// Skickar vidare reviewRouter Matchar ###
router.use('/:productId/reviews', reviewRouter);

router.route('/').get(productController.getAllProducts);
router.route('/:id').get(productController.getProduct);

module.exports = router;
