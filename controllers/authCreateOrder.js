const models = require('../models');
const OrderUser = models.orderUser;

exports.createOrder = (req, res) => {
  // Använda populate för att lägga till userId i orderUser?
  const order = new OrderUser({
    userId: req.userId,
    products: req.body,
  });

  order.save((err, user) => {
    if (err) {
      res.status(200).send({ message: err });
      return;
    }
  });
  res.status(200).send({
    status: 'success',
    order,
  });
};
