const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  content: String,
  actualPrice: Number,
  discountPrice: Number,
  image: String,
  category: String
});

// MongoDB collection: 'details'
module.exports = mongoose.model('details', productSchema);
