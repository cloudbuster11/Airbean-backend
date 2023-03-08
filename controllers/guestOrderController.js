const utils = require('../utils/');
const calculateNewEta = utils.calculateNewEta;
const models = require('../models');
const OrderGuest = models.orderGuest;

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await OrderGuest.create(req.body);

    res.status(201).json({
      status: 'success',
      messange: {
        eta: newOrder.details.eta,
        OrderNr: newOrder._id,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const order = await OrderGuest.findById(req.params.id);
    const newEta = calculateNewEta(order.details.createdAt, order.details.eta);

    res.status(200).json({
      status: 'success',
      data: {
        eta: newEta,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Ingen order matchar det orderNr.',
    });
  }
};
