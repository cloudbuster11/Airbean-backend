// const db = require('../models');
// const Product = db.product;
// const OrderGuest = db.orderGuest;

// const helper = require('../helpers/eta');

// exports.getAllProducts = async (req, res) => {
//   try {
//     const queryObj = { ...req.query };

//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     let query = Product.find(JSON.parse(queryStr));

//     const products = await query;

//     res.status(200).json({
//       status: 'success',
//       results: products.length,
//       menu: {
//         ...products,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.createOrder = async (req, res) => {
//   try {
//     const newOrder = await OrderGuest.create(req.body);

//     res.status(201).json({
//       status: 'success',
//       messange: {
//         eta: newOrder.details.eta,
//         OrderNr: newOrder._id,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getOrderStatus = async (req, res) => {
//   try {
//     const order = await OrderGuest.findById(req.params.id);
//     const newEta = helper.calculateNewEta(order.details.createdAt, order.details.eta);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         eta: newEta,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Ingen order matchar det orderNr.',
//     });
//   }
// };
