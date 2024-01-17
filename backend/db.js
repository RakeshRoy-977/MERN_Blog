const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.db_uri);
    console.log(`connected to MongoDB`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
