const express = require("express");
const {
  addOrderItem,
  getOrderById,
  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//getUserOrder
router.route("/myorders").get(protect, getMyOrders);
//get order by id
router.route("/:id").get(protect, getOrderById);
//create new order
router.route("/").post(protect, addOrderItem);
module.exports = router;
