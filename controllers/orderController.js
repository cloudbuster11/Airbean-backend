const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { Product, Order, User } = require('../models');
const { catchAsync, AppError, calculateNewEta } = require('../utils');
const factory = require('./handlerFactory');

let newOrderDb;

// När användaren klickar på beställ, req.body = produkterna. Så skickas man till betalningsurlen.
exports.getCheckoutSession = async (req, res, next) => {
  // Abstrahera senare. Duplicate code
  const validProducts = await Product.find({
    _id: {
      $in: req.body,
    },
  });

  newOrderDb = validProducts.map((product, i) => {
    return {
      _id: product._id,
      title: product.title,
      price: product.price,
      quantity: req.body[i].quantity,
      totalProductPrice: product.price * req.body[i].quantity,
    };
  });

  const stripeOrderData = validProducts.map((product, i) => {
    return {
      price_data: {
        currency: 'sek',
        unit_amount: product.price * 100,
        product_data: {
          name: `${product.title}`,
          description: product.desc,
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/500px-A_small_cup_of_coffee.JPG',
          ],
        },
      },
      quantity: req.body[i].quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: stripeOrderData,
    mode: 'payment',
    // success_url: `${req.protocol}://${req.get('host')}/api/orders/order-history/`,
    success_url: `http://www.dn.se`,
    cancel_url: 'http://aftonbladet.se',
    // cancel_url: `${req.protocol}://${'host'}/`,
    customer_email: req.user.email,
    // client_reference_id: req.params.productId,
  });

  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  // console.log(req.rawHeaders);

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.sendStatus(400).end();
  }

  if (event.type === 'checkout.session.completed') {
    createOrderCheckout(event.data.object);
  }
  res.status(200).end();
};

const createOrderCheckout = async (session) => {
  const user = await User.findOne({ email: session.customer_email });

  await Order.create({ user: user._id, products: newOrderDb });
};

// exports.createOrderCheckout = catchAsync(async (req, res, next) => {
//   const validProducts = await Product.find({
//     _id: {
//       $in: req.body,
//     },
//   });

//   const newOrder = validProducts.map((product, i) => {
//     return {
//       _id: product._id,
//       title: product.title,
//       price: product.price,
//       quantity: req.body[i].quantity,
//       totalProductPrice: product.price * req.body[i].quantity,
//     };
//   });

//   const createdOrder = await Order.create({ user: req.user._id, products: newOrder });

//   res.status(201).json({
//     status: 'success',
//     data: {
//       createdOrder,
//     },
//   });

//   // Här ska man redirectas till orderconfirmation
//   // res.redirect('http://localhost:8000/api/user/ordered/');
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
