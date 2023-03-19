const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { Product, Order } = require('../models');
const { catchAsync, AppError, calculateNewEta } = require('../utils');
const factory = require('./handlerFactory');

exports.cart = async () => {
  const carts = await Order.find().populate({
    path: 'items.productId',
    select: 'name price total',
  });
  return carts[0];
};

exports.addItem = async (payload) => {
  const newItem = await Order.create(payload);
  return newItem;
};

exports.getCheckoutSession = async (req, res, next) => {
  // Hämta produkten
  const product = await Product.findById(req.params.productId);

  // Skapa en checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'sek',
          unit_amount: product.price * 100,
          product_data: {
            name: `${product.title} Product`,
            description: product.desc,
            images: ['https://example.com/t-shirt.png'],
            // images: [`${adress till bilden på server}`],
          },
        },
        quantity: 1,
      },
    ],
    // payment_method_types: ['card'],
    mode: 'payment',
    // success_url: `${req.protocol}://${'host'}/ordered/`,
    success_url: `http://localhost:8000/api/user/ordered/?produc=${req.params.productId}&user=${req.user.id}&price=${product.price}`,
    cancel_url: `${req.protocol}://${'host'}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.productId,
  });
  // Skicka till klienten
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.createOrderCheckout = catchAsync(async (req, res, next) => {
  // const order = await Product.find({
  //   _id: {
  //     $in: req.body,
  //   },
  // }).populate('');

  const newOrder = await Order.create({ user: req.user.id, products: req.body });

  res.status(201).json({
    status: 'success',
    data: {
      newOrder,
    },
  });

  // res.redirect('http://localhost:8000/api/user/ordered/');
});

// exports.createOrderCheckout = catchAsync(async (req, res, next) => {
//   const { product, user, price } = req.query;
//   if (!product && !user && !price) return next();

//   await Order.create({ product, user, price });

//   // res.redirect(req.orignalUrl.split('?')[0]);
//   // Efter en lyckad betalning, redirect till den här sidan.
//   res.redirect('http://localhost:8000/api/user/ordered/');
// });

exports.getOrderHistory = catchAsync(async (req, res, next) => {
  const orderHistory = await Order.find({ userId: req.user._id });

  res.status(200).send({
    status: 'success',
    results: orderHistory.length,
    data: orderHistory,
  });
});

exports.getOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('No order found with that ID.', 404));
  }
  const newEta = calculateNewEta(order.createdAt, order.eta);

  res.status(200).json({
    status: 'success',
    data: {
      eta: newEta,
    },
  });
});

exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
// exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
