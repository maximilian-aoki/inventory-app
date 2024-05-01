const asyncHandler = require("express-async-handler");

// READ

exports.categoryList = asyncHandler(async (req, res, next) => {
  res.send(`list of categories`);
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
  res.send(`category id: ${req.params.id}`);
});

// CREATE

exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
  res.send(`new category form`);
});

exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
  res.send(`posted new category`);
});

// UPDATE

exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
  res.send(`form for updating category id: ${req.params.id}`);
});

exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
  res.send(`updated category id: ${req.params.id}`);
});

// DELETE

exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
  res.send(`form for deleting category id: ${req.params.id}`);
});

exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
  res.send(`deleted category id: ${req.params.id}`);
});
