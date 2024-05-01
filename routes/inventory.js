const express = require("express");
const asyncHandler = require("express-async-handler");

const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController");

const router = express.Router();

// MAIN INVENTORY PAGE

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.render("inventory_page", {
      title: "Digital Convenience Store",
      header: "Inventory Overview",
    });
  })
);

// CATEGORY ROUTES

router
  .route("/categories/create")
  .get(categoryController.categoryCreateGet)
  .post(categoryController.categoryCreatePost);

router.get("/categories", categoryController.categoryList);
router.get("/categories/:id", categoryController.categoryDetail);

router
  .route("/categories/:id/update")
  .get(categoryController.categoryUpdateGet)
  .post(categoryController.categoryUpdatePost);

router
  .route("/categories/:id/delete")
  .get(categoryController.categoryDeleteGet)
  .post(categoryController.categoryDeletePost);

// ITEM ROUTES

router
  .route("/items/create")
  .get(itemController.itemCreateGet)
  .post(itemController.itemCreatePost);

router.get("/items", itemController.itemList);
router.get("/items/:id", itemController.itemDetail);

router
  .route("/items/:id/update")
  .get(itemController.itemUpdateGet)
  .post(itemController.itemUpdatePost);

router
  .route("/items/:id/delete")
  .get(itemController.itemDeleteGet)
  .post(itemController.itemDeletePost);

module.exports = router;
