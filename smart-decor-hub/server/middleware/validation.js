const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Name is required.");
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email address is required.");
  }
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email address is required.");
  }
  if (!password) {
    errors.push("Password is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

const validateProduct = (req, res, next) => {
  const { name, category, price, description, stock } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Product name is required.");
  }
  if (!category || category.trim() === "") {
    errors.push("Product category is required.");
  }
  if (price === undefined || isNaN(price) || price < 0) {
    errors.push("Price must be a positive number.");
  }
  if (stock !== undefined && (isNaN(stock) || Number(stock) < 0)) {
    errors.push("Stock must be zero or a positive number.");
  }
  if (!description || description.trim() === "") {
    errors.push("Product description is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  req.body.category = category.trim();
  req.body.description = description.trim();
  req.body.price = Number(price);
  req.body.stock = stock === undefined || stock === "" ? 0 : Number(stock);
  next();
};

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Category name is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  if (req.body.description) req.body.description = req.body.description.trim();
  next();
};

const validateInquiry = (req, res, next) => {
  const { name, phone, message, product, email } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Name is required.");
  }
  if (!phone || phone.trim() === "") {
    errors.push("Phone number is required.");
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(phone.trim())) {
    errors.push("Enter a valid phone number.");
  }
  if (!message || message.trim() === "") {
    errors.push("Inquiry message is required.");
  }
  if (!product || product.trim() === "") {
    errors.push("Product name/ID is required.");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push("Enter a valid email address.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  req.body.phone = phone.trim();
  req.body.product = product.trim();
  req.body.message = message.trim();
  req.body.email = email ? email.trim().toLowerCase() : "";
  next();
};

const validateQuote = (req, res, next) => {
  const { customerName, phone, product, amount } = req.body;
  const errors = [];

  if (!customerName || customerName.trim() === "") {
    errors.push("Customer name is required.");
  }
  if (!phone || phone.trim() === "") {
    errors.push("Phone number is required.");
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(phone.trim())) {
    errors.push("Enter a valid phone number.");
  }
  if (!product || product.trim() === "") {
    errors.push("Product name/ID is required.");
  }
  if (amount === undefined || isNaN(amount) || amount <= 0) {
    errors.push("Quote amount must be a positive number.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.customerName = customerName.trim();
  req.body.phone = phone.trim();
  req.body.product = product.trim();
  req.body.amount = Number(amount);
  next();
};

const createStatusValidator = (allowedStatuses) => (req, res, next) => {
  const { status } = req.body;

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      errors: [`Status must be one of: ${allowedStatuses.join(", ")}.`],
    });
  }

  next();
};

const validateInquiryStatus = createStatusValidator(["Pending", "Contacted", "Closed"]);
const validateQuoteStatus = createStatusValidator(["Pending", "Approved", "Rejected"]);

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateCategory,
  validateInquiry,
  validateQuote,
  validateInquiryStatus,
  validateQuoteStatus,
};
