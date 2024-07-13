const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Failed to connect to DB");
    // for error handling
  }
}

module.exports = {
  connectToDB,
};
