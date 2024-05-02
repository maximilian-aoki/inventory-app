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

exports.categoryCreatePost = [
  val.pipe([val.valPassword, val.valName, val.valDesc]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      const allErrors = errors.array().map((error) => error.msg);
      const postVals = {
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      };

      return res.render("category_create", {
        title: "Digital Convenience Store",
        header: `Create a New Category`,
        errors: allErrors,
        postVals,
      });
    }

    const validatedData = matchedData(req);
    const newCategory = await Category.create({
      name: validatedData.name,
      description: validatedData.description,
      imgUrl:
        req.body.imgUrl === ""
          ? "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : req.body.imgUrl,
    });
    res.redirect(`/inventory/categories/${newCategory._id}`);
  }),
];

// UPDATE

exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  res.render("category_create", {
    title: "Digital Convenience Store",
    header: `Update Category: ${category.name}`,
    category,
  });
});

exports.categoryUpdatePost = [
  val.pipe([val.valPassword, val.valName, val.valDesc]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
      const category = await Category.findById(req.params.id).exec();
      const allErrors = errors.array().map((error) => error.msg);
      const postVals = {
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      };

      return res.render("category_create", {
        title: "Digital Convenience Store",
        header: `Update Category: ${category.name}`,
        category,
        errors: allErrors,
        postVals,
      });
    }

    const validatedData = matchedData(req);

    const category = await Category.findById(req.params.id).exec();

    category.name = validatedData.name;
    category.description = validatedData.description;
    category.imgUrl =
      req.body.imgUrl === ""
        ? "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : req.body.imgUrl;

    await category.save();
    res.redirect(`/inventory/categories/${category._id}`);
  }),
];

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
