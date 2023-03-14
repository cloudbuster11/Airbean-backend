const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
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
    },
    quantity: {
      type: Number,
      required: [true, 'A product must have a quantity.'],
      default: 1,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate. Istället för att spara en ref till alla reviews som tillhör produkten i db.
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
