const { Order, User } = require('../models');
const { catchAsync, calculateNewEta, AppError } = require('../utils');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createOrder = catchAsync(async (req, res) => {
  console.log(req.user._id);
  const newOrder = await Order.create({ userId: req.user._id, products: req.body });

  res.status(201).json({
    status: 'success',
    details: {
      order: newOrder,
    },
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

exports.getUserOrderHistory = catchAsync(async (req, res, next) => {
  console.log('userhistory');
  const orderHistory = await Order.find({ userId: req.user._id });

  res.status(200).send({
    status: 'success',
    results: orderHistory.length,
    data: orderHistory,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Fel om användaren försöker uppdatera lösenord.
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not to update password.'), 400);
  }

  // Uppdatera User. Save() fungerar inte eftersom då krävs att password skickas med. new: true = skickar tillbaka den nya Usern.
  // body.role = "admin" ej tillåtet. filtreras bort.
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: 'success', data: null });
});

// Flyttas till admincontroller

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
