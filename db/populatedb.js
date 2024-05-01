require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const uri = process.env.MONGO_DB_PROD_URI || process.env.MONGO_DB_DEV_URI;

main();
async function main() {
  try {
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
    const session = await mongoose.startSession();
    console.log("session started");
    await mongoose.connection.transaction(
      async (session) => {
        console.log("transaction started");
        await createCategories();
        await createItems();
      },
      { readPreference: "primary" }
    );
    console.log("transaction completed successfully");
    await mongoose.connection.close();
    console.log("mongoose connection closed");
  } catch (err) {
    console.error(err);
  }
}

async function createCategories() {
  console.log("creating categories");
  await Promise.all([
    addOneCategory(
      0,
      "drinks",
      "delicious cold beverages in classic cans!",
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneCategory(
      1,
      "snacks",
      "scrumptious bites in classic wrappers!",
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
  ]);
}

async function createItems() {
  console.log("creating items");
  await Promise.all([
    addOneItem(
      0,
      "mars bar",
      "chewy caramel in a chocolate coating",
      categories[1],
      2.99,
      5,
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      1,
      "root beer",
      "that classic rooty taste",
      categories[0],
      3.99,
      3,
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      2,
      "coca cola",
      "you already know what time it is",
      categories[0],
      4.99,
      1,
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
  ]);
}

async function addOneCategory(index, name, description, imgUrl) {
  console.log(`adding category ${index} with name '${name}'`);
  const newCategory = await Category.create({
    name,
    description,
    imgUrl,
  });
  categories[index] = newCategory;
}

async function addOneItem(
  index,
  name,
  description,
  category,
  price,
  numberInStock,
  imgUrl
) {
  console.log(`adding item ${index} with name '${name}'`);
  const newItem = await Item.create({
    name,
    description,
    category,
    price,
    numberInStock,
    imgUrl,
  });
  items[index] = newItem;
}
