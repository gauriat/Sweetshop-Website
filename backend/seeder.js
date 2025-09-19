const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
