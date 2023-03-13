const { calculateNewEta, catchAsync, AppError } = require('../utils');
const { OrderGuest } = require('../models');

exports.createOrder = catchAsync(async (req, res) => {
  const newOrder = await OrderGuest.create(req.body);

  res.status(201).json({
    status: 'success',
    messange: {
      eta: newOrder.details.eta,
      OrderNr: newOrder._id,
    },
  });
});

exports.getOrderStatus = catchAsync(async (req, res, next) => {
  const order = await OrderGuest.findById(req.params.id);
  if (!order) {
    return next(new AppError('No order was found with that id.', 404));
  }

  const newEta = calculateNewEta(order.details.createdAt, order.details.eta);

  res.status(200).json({
    status: 'success',
    data: {
      eta: newEta,
    },
  });
});
