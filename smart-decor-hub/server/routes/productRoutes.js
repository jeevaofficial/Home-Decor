const { protect, admin } =
require("../middleware/authMiddleware");
const { validateProduct } = require("../middleware/validation");


const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/")
  .post(protect, admin, validateProduct, createProduct)
  .get(getProducts);

router.route("/:id")
  .get(getProductById)
  .put(protect, admin, validateProduct, updateProduct)
  .delete(protect, admin, deleteProduct);
module.exports = router;
