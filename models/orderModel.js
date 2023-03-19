const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'An order must belong to a product.'],
      },
      title: {
        type: String,
      },
      price: {
        type: Number,
        ref: 'Product',
        require: [true, 'A product must have a price.'],
      },
      quantity: {
        type: Number,
        required: [true, 'A product must have a quantity.'],
        // default: 1,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A order must have a User Id.'],
  },
  eta: {
    type: Number,
    default: function () {
      return Math.floor(Math.random() * (25 - 5 + 1) + 5);
    },
  },
  totalPrice: {
    type: Number,
    // required: [true, 'A order must have a price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
