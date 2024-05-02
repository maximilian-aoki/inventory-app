const Item = require("../db/models/item");
const Category = require("../db/models/category");

const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");
const val = require("./validator");

// READ

exports.itemList = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find()
    .populate("category")
    .sort({ name: 1 })
    .exec();

  res.render("item_list", {
    title: "Digital Convenience Store",
    header: "All Products",
    allItems,
  });
});

exports.itemDetail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  res.render("item_detail", {
    title: "Digital Convenience Store",
    header: item.name,
    item,
  });
});

// CREATE

exports.itemCreateGet = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("item_create", {
    title: "Digital Convenience Store",
    header: "Create a New Product",
    allCategories,
  });
});

exports.itemCreatePost = asyncHandler(async (req, res, next) => {
  res.send(`new item created`);
});

// UPDATE

exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("item_create", {
    title: "Digital Convenience Store",
    header: `Update Product: ${item.name}`,
    item,
    allCategories,
  });
});

exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
  res.send(`updated item id: ${req.params.id}`);
});

// DELETE

exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  console.log(item);

  res.render("item_delete", {
    title: "Digital Convenience Store",
    header: `Delete Item: ${item.name}`,
    item,
  });
});

exports.itemDeletePost = [
  val.pipe([val.valPassword, val.valDeleteId]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      const item = await Item.findById(req.params.id).exec();
      const allErrors = errors.array().map((error) => error.msg);
      return res.render("item_delete", {
        title: "Digital Convenience Store",
        header: `Delete Item: ${item.name}`,
        item,
        errors: allErrors,
      });
    }

    const validatedData = matchedData(req);
    await Item.findOneAndDelete({
      _id: validatedData.deleteId,
    }).exec();
    res.redirect("/inventory/items");
  }),
];
