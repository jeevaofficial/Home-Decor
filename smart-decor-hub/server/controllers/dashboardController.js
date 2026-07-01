const Product = require("../models/Product");
const Inquiry = require("../models/Inquiry");
const Quote = require("../models/Quote");
const Category = require("../models/Category");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const totalQuotes = await Quote.countDocuments();
    const totalCategories = await Category.countDocuments();

    const recentQuotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Group quotes count by status
    const quotesByStatus = {
      pending: await Quote.countDocuments({ status: "Pending" }),
      approved: await Quote.countDocuments({ status: "Approved" }),
      rejected: await Quote.countDocuments({ status: "Rejected" }),
    };

    res.json({
      totalProducts,
      totalInquiries,
      totalQuotes,
      totalCategories,
      recentQuotes,
      recentInquiries,
      quotesByStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};