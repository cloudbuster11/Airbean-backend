const mongoose = require('mongoose');
const Product = require('./productModel');

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
        required: [true, 'A product must have a price.'],
      },
      quantity: {
        type: Number,
        required: [true, 'A product must have a quantity.'],
        min: 1,
        default: 1,
      },
      totalProductPrice: {
        type: Number,
        required: [true, 'A product must have a total price.'],
        min: 1,
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
    default: 0,
    required: [true, 'A order must have a total price.'],
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

orderSchema.pre('save', function (next) {
  this.totalPrice = this.products.map((product) => {
    this.totalPrice += product.totalProductPrice;
  });
  console.log(this.totalPrice);
  next();
});

// Static methods
// orderSchema.statics.calcTotalPrice = async function (orderId) {
//   const stats = await this.aggregate([
//     { $match: { orderId } },
//     // {
//     //   $group: {
//     //     _id: '$product',
//     //     totalPrice: { $sum: 1 },

//     //   },
//     // },
//   ]);
//   console.log(orderId);
// };

// orderSchema.post('save', function () {
//   // this pekar på current review
//   // await this.findOne() fungerar inte här, query har redan körts.

//   this.constructor.calcTotalPrice(this.order);
// });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
