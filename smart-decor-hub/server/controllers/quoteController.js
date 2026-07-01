const Quote = require("../models/Quote");

// @desc    Create a new quote request
// @route   POST /api/quotes
// @access  Public
const createQuote = async (req, res, next) => {
  try {
    const { customerName, phone, product, amount } = req.body;

    const quote = await Quote.create({
      customerName,
      phone,
      product,
      amount,
    });

    res.status(201).json(quote);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Private/Admin
const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quote by ID
// @route   GET /api/quotes/:id
// @access  Private/Admin
const getQuoteById = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        message: "Quote request not found",
      });
    }
    res.json(quote);
  } catch (error) {
    next(error);
  }
};

// @desc    Update quote status
// @route   PUT /api/quotes/:id
// @access  Private/Admin
const updateQuoteStatus = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        message: "Quote request not found",
      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        message: "Status value is required",
      });
    }

    quote.status = status;
    const updatedQuote = await quote.save();

    res.json(updatedQuote);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a quote
// @route   DELETE /api/quotes/:id
// @access  Private/Admin
const deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        message: "Quote request not found",
      });
    }

    await quote.deleteOne();
    res.json({ message: "Quote request deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
};
