const mongoose = require("mongoose");
//require("colors");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS__URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongoose connection error : ${error.message}`);
  }

};

module.exports = connectDb;
