const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Set security HTTP headers
app.use(helmet());

const allowedOrigins = (
  process.env.CLIENT_URL ||
  "http://localhost:3000,http://localhost:5173,https://home-decor-vuee.onrender.com"
)
  .split(",")
  .map((origin) => origin.trim());

// Enable CORS
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Sanitize data against NoSQL query injection
app.use(mongoSanitize());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per 15 minutes
  message: {
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

// Database connection status check middleware
app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message:
        "Database is not connected. Check MongoDB Atlas Network Access/IP whitelist.",
    });
  }
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/quotes", require("./routes/quoteRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

app.get("/", (req, res) => {
  res.json({
    message: "BEST HOME DECORS API Running",
  });
});

app.use("/api", (req, res) => {
  res.status(404).json({
    message: `API route not found: ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(
      "Starting API without database connection. Database routes will return 503."
    );
  }

  app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });
};

startServer();
