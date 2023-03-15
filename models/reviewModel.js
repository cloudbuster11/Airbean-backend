const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty.'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user.'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({ path: 'product', select: 'title' }).populate({ path: 'user', select: 'name' });
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

// Static methods
reviewSchema.statics.calcAverageRatings = async function ({ _id: productId }) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Product.findByIdAndUpdate(productId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};

reviewSchema.post('save', function () {
  // this pekar på current review

  this.constructor.calcAverageRatings(this.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
