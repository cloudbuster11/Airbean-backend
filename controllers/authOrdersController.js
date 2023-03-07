const helper = require('../helpers/eta');
const db = require('../models');
const OrderUser = db.orderUser;

exports.getOrderStatus = async (req, res) => {
  try {
    const order = await OrderUser.findById(req.params.id);
    const newEta = helper.calculateNewEta(order.createdAt, order.eta);

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

exports.getAllUserOrders = async (req, res) => {
  OrderUser.find({ userId: req.userId }).exec((err, orderhistory) => {
    if (orderhistory.length === 0) {
      res.status(200).json({
        status: 'success',
        message: 'No orders for this user.',
      });
    }

    res.status(200).send({
      status: 'success',
      message: orderhistory,
    });
  });

  // Errorhantering
};
