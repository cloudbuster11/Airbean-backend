const { Order, Review } = require('../models');
const { catchAsync, AppError } = require('../utils');

exports.getAllReviews = catchAsync(async (req, res) => {
  let filter = {};
  // Om inget params med productId så hämta alla reviews.
  if (req.params.productId) filter = { product: req.params.productId };

  const allReviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: allReviews.length,
    data: {
      reviews: allReviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  // Ger tillgång till nested routes.
  if (!req.body.product) req.body.product = req.params.productId;
  // if (!req.body.user) req.body.user = req.user.id;
  req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
