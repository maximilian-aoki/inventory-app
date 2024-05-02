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
    required: false,
    default:
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
});

categorySchema.virtual("url").get(function () {
  return `/inventory/categories/${this._id}`;
});

module.exports = mongoose.model("Category", categorySchema);
