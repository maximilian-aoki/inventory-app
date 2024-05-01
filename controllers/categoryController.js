const asyncHandler = require("express-async-handler");

// READ

exports.categoryList = asyncHandler(async (req, res, next) => {
  res.render("category_list", {
    title: "Digital Convenience Store",
    header: "All Categories",
  });
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
  res.send(`category id: ${req.params.id}`);
});

// CREATE

exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
  res.render("category_create", {
    title: "Digital Convenience Store",
    header: "Create a New Category",
  });
});

exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
  res.send(`posted new category`);
});

// UPDATE

exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
  res.render("category_create", {
    title: "Digital Convenience Store",
    header: "Update a Category",
  });
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
