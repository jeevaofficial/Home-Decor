const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { validateCategory } = require("../middleware/validation");
const {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .post(protect, admin, validateCategory, createCategory)
  .get(getCategories);

router.route("/:slug").get(getCategoryBySlug);

router
  .route("/:id")
  .put(protect, admin, validateCategory, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;
