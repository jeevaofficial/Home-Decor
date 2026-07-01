const cloudinary = require("cloudinary").v2;

const requiredEnvVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

const isCloudinaryConfigured = missingEnvVars.length === 0;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

cloudinary.isConfigured = isCloudinaryConfigured;
cloudinary.missingEnvVars = missingEnvVars;

module.exports = cloudinary;
