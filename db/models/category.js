const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
  imgUrl: {
    type: String,
    minLength: 2,
  },
});

categorySchema.virtual("url").get(function () {
  return `/inventory/categories/${this._id}`;
});

module.exports = mongoose.model("Category", categorySchema);
