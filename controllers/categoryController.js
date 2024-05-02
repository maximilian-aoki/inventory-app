const Item = require("../db/models/item");
const Category = require("../db/models/category");

const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");
const val = require("./validator");

// READ

exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("category_list", {
    title: "Digital Convenience Store",
    header: "All Categories",
    allCategories,
  });
});

exports.categoryDetail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const allItems = await Item.find({ category: category._id })
    .sort({ name: 1 })
    .exec();

  res.render("category_detail", {
    title: "Digital Convenience Store",
    header: category.name,
    category,
    allItems,
  });
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
  const category = await Category.findById(req.params.id).exec();

  res.render("category_create", {
    title: "Digital Convenience Store",
    header: `Update Category: ${category.name}`,
    category,
  });
});

exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
  res.send(`updated category id: ${req.params.id}`);
});

// DELETE

exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const allItems = await Item.find({ category: category._id });

  res.render("category_delete", {
    title: "Digital Convenience Store",
    header: `Delete Category: ${category.name}`,
    category,
    allItems,
  });
});

exports.categoryDeletePost = [
  val.pipe([val.valPassword, val.valDeleteId]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      const category = await Category.findById(req.params.id).exec();
      const allItems = await Item.find({ category: category._id });
      const allErrors = errors.array().map((error) => error.msg);
      return res.render("category_delete", {
        title: "Digital Convenience Store",
        header: `Delete Category: ${category.name}`,
        category,
        allItems,
        errors: allErrors,
      });
    }

    const validatedData = matchedData(req);
    await Item.deleteMany({
      category: validatedData.deleteId,
    }).exec();
    await Category.findOneAndDelete({
      _id: validatedData.deleteId,
    }).exec();
    res.redirect("/inventory/categories");
  }),
];
