const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const uploadSingleImage = upload.single("image");

router.post(
  "/",
  protect,
  admin,
  (req, res) => {
    uploadSingleImage(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        return res.status(400).json({
          message: error.message,
        });
      }

      if (error) {
        return res.status(error.statusCode || 500).json({
          message: error.message || "Image upload failed",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message:
            'No image file uploaded. Use multipart/form-data with a file field named "image".',
        });
      }

      // If Cloudinary is configured, try uploading to Cloudinary
      if (cloudinary.isConfigured) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "smart-decor-products",
          });

          // Delete local file after successful upload to Cloudinary
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }

          return res.status(201).json({
            imageUrl: result.secure_url,
          });
        } catch (cloudinaryError) {
          console.warn("Cloudinary upload failed, falling back to local storage:", cloudinaryError.message);
          // Fall through to local storage serving
        }
      }

      // Fallback: Serve the locally saved file
      const localUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      return res.status(201).json({
        imageUrl: localUrl,
      });
    });
  }
);

module.exports = router;
