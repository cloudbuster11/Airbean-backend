const { Product } = require('../models');
const { catchAsync, AppError } = require('../utils');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const menu = await Product.find();

  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews');

  if (!product) {
    return next(new AppError('No product with that ID found.'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});
