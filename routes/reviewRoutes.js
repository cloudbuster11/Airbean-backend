const express = require('express');
// Default så har en route tillgång till params i sin egna route. productId finns alltså inte i route('/')
const router = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

// ###
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setProductUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(authController.protect, reviewController.deleteReview);

module.exports = router;
