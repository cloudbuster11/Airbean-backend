const express = require('express');
// Default så har en route tillgång till params i sin egna route. productId finns alltså inte i route('/')
const router = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

// ###
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);

module.exports = router;
