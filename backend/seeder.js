const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const products = require("./data/Products");
const connectDb = require("./config/config");

dotenv.config();
connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Before User.insertMany");
        console.log("users:", users);

        const createUser = await User.insertMany(users);
        console.log("After User.insertMany");
        console.log("createUser:", createUser);

        const adminUser = createUser[0]._id;
        console.log("adminUser:", adminUser);

        const sampleData = products.map(product => {
            return { ...product, user: adminUser }; 
        });
        await Product.insertMany(sampleData);
        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
};
 
const dataDestroy = async () => {
    try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destory");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};
 
if (process.argv[2] === "-d") {
    dataDestroy();
} else {
    importData();
};