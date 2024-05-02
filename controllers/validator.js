require("dotenv").config();
const { body } = require("express-validator");

const validator = {};

// create/update operations
validator.valName = body("name")
  .trim()
  .isLength({ min: 2, max: 25 })
  .withMessage("must provide a name!")
  .escape();
validator.valDesc = body("description")
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage("must provide a description between 2-100 chars long")
  .escape();
validator.valImgUrl = body("imgUrl").optional().trim().escape();
validator.valPrice = body("price")
  .trim()
  .isNumeric()
  .withMessage("must provide a numeric price")
  .escape();
validator.valNumInStock = body("numberInStock")
  .trim()
  .isInt({ min: 0, max: 100 })
  .withMessage("must provide integer stock")
  .escape();
validator.valCategory = body("category").trim().isLength({ min: 1 }).escape();

// delete operations
validator.valPassword = body("password")
  .equals(process.env.ADMIN_PASSWORD)
  .withMessage("password must be equal to Admin password")
  .escape();
validator.valDeleteId = body("deleteId").trim().escape();

// validator pipe (returns middleware)
validator.pipe = (validators) => {
  return async (req, res, next) => {
    for (let i = 0; i < validators.length; i += 1) {
      await validators[i].run(req);
    }
    next();
  };
};

module.exports = validator;
