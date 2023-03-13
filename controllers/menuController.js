const { Product } = require('../models');
const { catchAsync, AppError } = require('../utils');

exports.getAllProducts = catchAsync(async (req, res) => {
  const menu = await Product.find();

  res.status(200).json({
    status: 'success',
    menu,
  });
});
