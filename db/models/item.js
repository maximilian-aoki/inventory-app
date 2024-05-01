const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 25,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  imgUrl: {
    type: String,
    minLength: 2,
  },
});

itemSchema.virtual("url").get(function () {
  return `/inventory/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
