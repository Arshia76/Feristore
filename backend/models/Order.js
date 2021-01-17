const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      productName: {
        type: String,
        required: true,
        trim: true,
      },

      productCount: {
        type: Number,
        required: true,
      },

      productPrice: {
        type: Number,
        required: true,
      },

      productImage: {
        type: Number,
        required: true,
      },
    },
  ],

  shipping: {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

module.exports =
  mongoose.models('Order') || mongoose.model('Order', OrderSchema);
