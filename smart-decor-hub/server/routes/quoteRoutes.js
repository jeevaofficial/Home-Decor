const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { validateQuote, validateQuoteStatus } = require("../middleware/validation");
const {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
} = require("../controllers/quoteController");

const router = express.Router();

router
  .route("/")
  .post(validateQuote, createQuote)
  .get(protect, admin, getQuotes);

router
  .route("/:id")
  .get(protect, admin, getQuoteById)
  .put(protect, admin, validateQuoteStatus, updateQuoteStatus)
  .delete(protect, admin, deleteQuote);

module.exports = router;
