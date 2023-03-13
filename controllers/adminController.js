const { OrderUser, Product } = require('../models');
const { apiFeatures, catchAsync, AppError } = require('../utils/');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(OrderUser.find(), req.query).filter().sort().limitFields().paginate();
  const allOrders = await features.query;

  res.status(200).json({
    status: 'success',
    results: allOrders.length,
    data: {
      allOrders,
    },
  });
});

exports.getMenu = catchAsync(async (req, res) => {
  const menu = await Product.find();

  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
});

exports.addToMenu = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({ status: 'success', data: newProduct });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No Product found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return next(new AppError('No product found with that id.', 404));
  }
  res.status(200).json({
    status: 'success',
    message: `${deletedProduct.title} was removed from menu.`,
  });
});
