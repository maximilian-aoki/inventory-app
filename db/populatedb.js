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
      "Snacks",
      "You deserve a lil treat!",
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneCategory(
      1,
      "Drinks",
      "Refreshing flavours to QUENCH that thirst",
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneCategory(
      2,
      "Bakery",
      "Scrumptious baked goods to satisfy the carb cravings",
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneCategory(
      3,
      "Stationary",
      "You never know when you'll have to write something down!",
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneCategory(
      4,
      "Electronics",
      "When you need that tech hit on the go",
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
  ]);
}

async function createItems() {
  console.log("creating items");
  await Promise.all([
    addOneItem(
      0,
      "Mars Bar",
      "Chocolate over caramel from outer space",
      categories[0],
      1.99,
      4,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      1,
      "Classic Chips",
      "Salty crunch! So classic",
      categories[0],
      3.99,
      13,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      2,
      "Dairy Milk",
      "Don't be fooled by the name - this is chocolate",
      categories[0],
      1.99,
      10,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      3,
      "Coca Cola",
      "The best drink out there",
      categories[1],
      3.99,
      6,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      4,
      "Pepsi",
      "Providing stiff competition for the 'best drink out there' title",
      categories[1],
      3.99,
      11,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      5,
      "Sprite",
      "Need a refreshing hit of lemon-lime?",
      categories[1],
      3.99,
      7,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      6,
      "Croissant",
      "Throw some ham and cheese on this bad boy",
      categories[2],
      2.99,
      8,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      7,
      "Cinnamon Roll",
      "A swirl of doughey, cinnamon-y goodness",
      categories[2],
      3.99,
      3,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      8,
      "Pens",
      "Literally to write things down",
      categories[3],
      3.99,
      12,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      9,
      "Notebook",
      "Probably should get a pen with this",
      categories[3],
      4.99,
      5,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      10,
      "Headphones",
      "It's time to LOCK IN",
      categories[4],
      6.99,
      10,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      11,
      "Charger",
      "3rd party, 1st in price. Probably won't catch fire",
      categories[4],
      7.99,
      3,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ),
    addOneItem(
      12,
      "Smart Phone",
      "No it's not stolen, stop asking questions",
      categories[4],
      9.99,
      1,
      "https://images.unsplash.com/photo-1610187966294-0d2491a3cb1c?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
