const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  details: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    eta: {
      type: Number,
      default: function () {
        return Math.floor(Math.random() * (25 - 5 + 1) + 5);
      },
    },
    order: [
      {
        name: {
          type: String,
          required: [true, 'A Order must have a Name.'],
        },
        price: {
          type: Number,
          required: [true, 'A Order must have a Price.'],
        },
      },
    ],
  },
});

const Order = mongoose.model('OrderGuest', orderSchema);

module.exports = Order;
