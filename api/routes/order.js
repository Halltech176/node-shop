const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Order routes
router.get("/", async (request, response, next) => {
  const order = await Order.find().select("-__v").populate("product", "-__v");
  response.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

router.post("/", async (request, response, next) => {
  try {
    const product = await Product.findById(request.body.product);
    let order;
    if (product === null) {
      order = "product id not available";
    } else {
      order = await Order.create(request.body);
    }

    response.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    status: "fail";
  }
});

router.get("/:orderId", async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    const order = await Order.findById(orderId).populate("product");
    response.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    response.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
