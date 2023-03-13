const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, 'A product must have a title.'],
    unique: [true, 'A product must have a unique title.'],
  },
  desc: {
    type: String,
    required: [true, 'A product must have a description.'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
    min: [1, 'Price must be above 1'],
    // max: [5, 'Rating must be below 5.0'],
  },
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
