const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

// Load models
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");

// Config dotenv
dotenv.config({ path: path.join(__dirname, ".env") });

const categoriesData = [
  {
    name: "Mosquito Nets",
    slug: "mosquito-nets",
    description: "Fibre, Stainless Steel (SS), and sliding mosquito net solutions for windows and doors.",
    image: "https://images.unsplash.com/photo-1629851179768-3069b165b4ec?w=600&q=80",
  },
  {
    name: "Curtains",
    slug: "curtains",
    description: "Premium custom, window, and door curtains tailored to match your interior styling.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
  },
  {
    name: "Blinds",
    slug: "blinds",
    description: "Zebra blinds, roller blinds, PVC bamboo blinds, and professional office vertical blinds.",
    image: "https://images.unsplash.com/photo-1505692438865-1758d7eaa436?w=600&q=80",
  },
];

const productsData = [
  {
    name: "Fiberglass Mosquito Net",
    category: "Mosquito Nets",
    price: 1499,
    description: "High-quality fiberglass mesh with durable PVC frame. Features rust-free magnetic closure, easy to detach and clean. Perfect for residential windows.",
    image: "https://images.unsplash.com/photo-1629851179768-3069b165b4ec?w=600&q=80",
    stock: 25,
  },
  {
    name: "304 Grade SS Mosquito Net",
    category: "Mosquito Nets",
    price: 3499,
    description: "Heavy-duty 304 grade stainless steel wire mesh. Resistant to scratches, rust, and pests. Provides superior durability and security.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    stock: 15,
  },
  {
    name: "Premium Velvet Blackout Curtain",
    category: "Curtains",
    price: 2499,
    description: "Luxury velvet curtains with full thermal blackout backing. Noise reduction and temperature regulation. Available in custom dimensions.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    stock: 30,
  },
  {
    name: "Modern Dual Zebra Blind",
    category: "Blinds",
    price: 1899,
    description: "Contemporary dual-layered roller blind with alternating sheer and solid stripes. Enables seamless shifting between privacy and light control.",
    image: "https://images.unsplash.com/photo-1505692438865-1758d7eaa436?w=600&q=80",
    stock: 20,
  },
  {
    name: "Professional Vertical Office Blind",
    category: "Blinds",
    price: 2899,
    description: "Highly functional vertical louvers made of premium fabric. Easy orientation controls. Ideal for corporate boardrooms and large office windows.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    stock: 10,
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables");
    }

    console.log("Connecting to database for seeding...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected.");

    // Clear existing data (optional, but good for clean start)
    console.log("Clearing existing Categories and Products...");
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Seed Categories
    console.log("Seeding Categories...");
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Successfully seeded ${createdCategories.length} categories.`);

    // Seed Products
    console.log("Seeding Products...");
    const createdProducts = await Product.insertMany(productsData);
    console.log(`Successfully seeded ${createdProducts.length} products.`);

    // Create Admin User if not exists
    console.log("Checking Admin user...");
    const adminEmail = "admin@besthomedecors.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      console.log("Creating default admin account...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      await User.create({
        name: "Home Decors Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`Admin account created successfully! Credentials:\nEmail: ${adminEmail}\nPassword: admin123`);
    } else {
      console.log("Admin account already exists.");
    }

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
