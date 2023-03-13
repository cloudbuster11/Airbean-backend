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
      title: {
        type: String,
        ref: 'Products',
        required: [true, 'A Order must have a valid title.'],
      },
      // productId: {
      //   type: String,
      //   required: [true, 'A Order must have a Product Id.'],
      // },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, 'A Order must have a valid product id.'],
      },
      price: {
        type: Number,
        ref: 'Products',
        required: [true, 'A Order must have a valid price.'],
      },
    },
  ],
});

const OrderUser = mongoose.model('OrderUser', orderUserSchema);

module.exports = OrderUser;
