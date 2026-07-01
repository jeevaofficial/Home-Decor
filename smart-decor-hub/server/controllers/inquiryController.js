const Inquiry = require("../models/Inquiry");

// Create Inquiry
const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

// Get All Inquiries
const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({
      createdAt: -1,
    });

    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatus = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    inquiry.status = req.body.status;
    const updatedInquiry = await inquiry.save();

    res.json(updatedInquiry);
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        message: "Inquiry not found",
      });
    }

    await inquiry.deleteOne();
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
};
