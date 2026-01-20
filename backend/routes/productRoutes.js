const express = require("express");
const { getProducts, getProduct } = require('../controllers/productController');  
const router = express.Router();

//GET Route for all products
router.route("/products").get(getProducts);

//GET Route for one products
router.route("/products/:id").get(getProduct);

module.exports = router;