const express = require("express");
const router = express.Router();
const { checkToken } = require("../controller/productAuth");
const {
  getAllProducts,
  getProduct,
  updateProducct,
  deleteProduct,
  createProduct,
} = require("../controller/productController");

router.route("/").get(checkToken, getAllProducts).post(createProduct);
router
  .route("/:productId")
  .get(getProduct)
  .patch(updateProducct)
  .delete(deleteProduct);

module.exports = router;
