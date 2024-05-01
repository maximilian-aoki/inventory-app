require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_DB_PROD_URI || process.env.MONGO_DB_DEV_URI;

mongoose.connection.on("connected", () => console.log("connected to MongoDB"));
mongoose.connection.on("error", () => console.log("error in MongoDB"));
mongoose.connection.on("disconnected", () =>
  console.log("disconnected from MongoDB")
);

async function connectMongoose() {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  connectMongoose,
};
