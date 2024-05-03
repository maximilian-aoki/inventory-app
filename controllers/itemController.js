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

exports.itemCreatePost = [
  val.pipe([
    val.valPassword,
    val.valCategory,
    val.valName,
    val.valDesc,
    val.valPrice,
    val.valNumInStock,
  ]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      const allErrors = errors.array().map((error) => error.msg);
      const postVals = {
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
        imgUrl: req.body.imgUrl,
      };

      return res.render("item_create", {
        title: "Digital Convenience Store",
        header: "Create a New Product",
        allCategories,
        errors: allErrors,
        postVals,
      });
    }

    const validatedData = matchedData(req);
    const newItem = await Item.create({
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price,
      numberInStock: validatedData.numberInStock,
      imgUrl:
        req.body.imgUrl === ""
          ? "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : req.body.imgUrl,
      category: validatedData.category,
    });
    res.redirect(`/inventory/items/${newItem._id}`);
  }),
];

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

exports.itemUpdatePost = [
  val.pipe([
    val.valPassword,
    val.valCategory,
    val.valName,
    val.valDesc,
    val.valPrice,
    val.valNumInStock,
  ]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      const item = await Item.findById(req.params.id).exec();
      const allCategories = await Category.find().sort({ name: 1 }).exec();
      const allErrors = errors.array().map((error) => error.msg);
      const postVals = {
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
        imgUrl: req.body.imgUrl,
      };

      return res.render("item_create", {
        title: "Digital Convenience Store",
        header: `Update Product: ${item.name}`,
        item,
        allCategories,
        errors: allErrors,
        postVals,
      });
    }

    const validatedData = matchedData(req);

    const item = await Item.findById(req.params.id).exec();

    item.category = validatedData.category;
    item.name = validatedData.name;
    item.description = validatedData.description;
    item.price = Number(validatedData.price);
    item.numberInStock = Number(validatedData.numberInStock);
    item.imgUrl =
      req.body.imgUrl === ""
        ? "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : req.body.imgUrl;

    await item.save();
    res.redirect(`/inventory/items/${item._id}`);
  }),
];

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
