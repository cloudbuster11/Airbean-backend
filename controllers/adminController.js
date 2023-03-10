const models = require('../models');
const Order = require('../models/orderGuestModel');
const OrderUser = models.orderUser;
const Product = models.product;

const utils = require('../utils/');
const apiFeatures = utils.apiFeatures;

exports.getAllOrders = async (req, res) => {
  try {
    const features = new apiFeatures(OrderUser.find(), req.query).filter().sort().limitFields().paginate();
    const allOrders = await features.query;

    res.status(200).json({
      status: 'success',
      results: allOrders.length,
      data: {
        allOrders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const menu = await Product.find();

    res.status(200).json({
      status: 'success',
      data: {
        menu,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addToMenu = async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
    });

    newProduct.save((err, newProduct) => {
      if (err) {
        console.log(err);
        res.status(200).send({ message: err });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: {
          newProduct,
        },
      });
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: 'No product found!',
    });
  }
};
