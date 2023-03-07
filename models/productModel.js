const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    // required: [true, 'A product must have a id.'],
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'A product must have a title.'],
  },
  desc: {
    type: String,
    required: [true, 'A product must have a description.'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
  },
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
