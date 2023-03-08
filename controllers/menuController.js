const models = require('../models');
const Product = models.product;

exports.getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    const products = await query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      menu: {
        ...products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
