const { Review } = require('../models');

const factory = require('./handlerFactory');

// Middleware
exports.setProductUserIds = (req, res, next) => {
  // Ger tillgång till nested routes.
  if (!req.body.product) req.body.product = req.params.productId;
  // if (!req.body.user) req.body.user = req.user.id;
  req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
