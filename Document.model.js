require("dotenv").config();
const mongoose = require("mongoose");
const debug = require("debug")("app");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    debug("Connected to MongoDB");
  } catch (err) {
    debug(err.message);
  }
})();

const Document = mongoose.model(
  "Document",
  new mongoose.Schema({
    text: String,
    vector: [Number],
    metadata: String,
  })
);

module.exports= Document;
