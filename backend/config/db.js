const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`db connected`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
