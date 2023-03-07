const helper = require('../helpers/eta');
const db = require('../models');
const OrderGuest = db.orderGuest;

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
  console.log();
  try {
    const order = await OrderGuest.findById(req.params.id);
    const newEta = helper.calculateNewEta(order.details.createdAt, order.details.eta);

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
