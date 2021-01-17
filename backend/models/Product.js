const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },

  image: {
    type: String,
    required: true,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  rating: {
    default: 1,
    type: Number,
    required: true,
  },

  reviews: [
    {
      reviewer: {
        type: String,
        ref: 'Users',
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: true,
    ref: 'Categories',
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  carousel: {
    type: Boolean,
    default: false,
  },

  special: {
    type: Boolean,
    default: false,
  },

  discount:{
    type:Number,
    default:0
  },

  isDiscount:{
    type:Boolean,
    default:false
  }

});

module.exports =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
