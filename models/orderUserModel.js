const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/userModel');

const orderUserSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A order must have a User Id.'],
  },
  eta: {
    type: Number,
    default: function () {
      return Math.floor(Math.random() * (25 - 5 + 1) + 5);
    },
  },
  products: [
    {
      name: {
        type: String,
        required: [true, 'A Order must have a Name.'],
      },
      productId: {
        type: String,
        required: [true, 'A Order must have a Product Id.'],
      },
      price: {
        type: Number,
        required: [true, 'A Order must have a Price.'],
      },
    },
  ],
});

const OrderUser = mongoose.model('OrderUser', orderUserSchema);

module.exports = OrderUser;
