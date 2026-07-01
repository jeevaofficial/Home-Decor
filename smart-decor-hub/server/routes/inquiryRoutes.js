const express = require("express");

const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");

const { protect, admin } = require("../middleware/authMiddleware");
const { validateInquiry, validateInquiryStatus } = require("../middleware/validation");

const router = express.Router();

router.route("/")
  .post(validateInquiry, createInquiry)
  .get(protect, admin, getInquiries);

router.route("/:id")
  .put(protect, admin, validateInquiryStatus, updateInquiryStatus)
  .delete(protect, admin, deleteInquiry);

module.exports = router;
