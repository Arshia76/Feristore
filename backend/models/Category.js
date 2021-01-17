const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports =
  mongoose.models.Category || mongoose.model('Category', CategorySchema);
