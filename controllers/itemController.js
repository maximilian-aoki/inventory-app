const asyncHandler = require("express-async-handler");

// READ

exports.itemList = asyncHandler(async (req, res, next) => {
  res.send(`list of items`);
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
  res.send(`item id: ${req.params.id}`);
});

// CREATE

exports.itemCreateGet = asyncHandler(async (req, res, next) => {
  res.send(`form to create new item`);
});

exports.itemCreatePost = asyncHandler(async (req, res, next) => {
  res.send(`new item created`);
});

// UPDATE

exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
  res.send(`form to update item id: ${req.params.id}`);
});

exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
  res.send(`updated item id: ${req.params.id}`);
});

// DELETE

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
  res.send(`form to delete item id: ${req.params.id}`);
});

exports.itemDeletePost = asyncHandler(async (req, res, next) => {
  res.send(`deleted id: ${req.params.id}`);
});
