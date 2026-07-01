const Category = require("../models/Category");
const Product = require("../models/Product");

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Generate clean URL slug from text
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    const trimmedName = name.trim();
    const categoryExists = await Category.findOne({
      name: { $regex: `^${escapeRegExp(trimmedName)}$`, $options: "i" },
    });
    if (categoryExists) {
      return res.status(400).json({
        message: "Category already exists with this name",
      });
    }

    const slug = slugify(trimmedName);
    const category = await Category.create({
      name: trimmedName,
      slug,
      description: description || "",
      image: image || "",
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by slug
// @route   GET /api/categories/:slug
// @access  Public
const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const { name, description, image } = req.body;
    
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        _id: { $ne: category._id },
        name: { $regex: `^${escapeRegExp(name.trim())}$`, $options: "i" },
      });

      if (existingCategory) {
        return res.status(400).json({
          message: "Category already exists with this name",
        });
      }

      category.name = name.trim();
      category.slug = slugify(name);
    }
    
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const attachedProduct = await Product.findOne({ category: category.name });
    if (attachedProduct) {
      return res.status(400).json({
        message: "Cannot delete a category that still has products attached.",
      });
    }

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
