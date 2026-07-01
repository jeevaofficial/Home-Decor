import API from "./api";

// --- Product Service ---
const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

const createProduct = async (productData) => {
  const response = await API.post("/products", productData);
  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};

// --- Category Service ---
const getCategories = async () => {
  const response = await API.get("/categories");
  return response.data;
};

const getCategoryBySlug = async (slug) => {
  const response = await API.get(`/categories/${slug}`);
  return response.data;
};

const createCategory = async (categoryData) => {
  const response = await API.post("/categories", categoryData);
  return response.data;
};

const updateCategory = async (id, categoryData) => {
  const response = await API.put(`/categories/${id}`, categoryData);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/${id}`);
  return response.data;
};

// --- Inquiry Service ---
const getInquiries = async () => {
  const response = await API.get("/inquiries");
  return response.data;
};

const createInquiry = async (inquiryData) => {
  const response = await API.post("/inquiries", inquiryData);
  return response.data;
};

const updateInquiryStatus = async (id, status) => {
  const response = await API.put(`/inquiries/${id}`, { status });
  return response.data;
};

const deleteInquiry = async (id) => {
  const response = await API.delete(`/inquiries/${id}`);
  return response.data;
};

// --- Quote Service ---
const getQuotes = async () => {
  const response = await API.get("/quotes");
  return response.data;
};

const createQuote = async (quoteData) => {
  const response = await API.post("/quotes", quoteData);
  return response.data;
};

const updateQuoteStatus = async (id, status) => {
  const response = await API.put(`/quotes/${id}`, { status });
  return response.data;
};

const deleteQuote = async (id) => {
  const response = await API.delete(`/quotes/${id}`);
  return response.data;
};

// --- Dashboard Service ---
const getDashboardStats = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

// --- File Upload ---
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // returns { imageUrl }
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
  getQuotes,
  createQuote,
  updateQuoteStatus,
  deleteQuote,
  getDashboardStats,
  uploadImage,
};

export default productService;
