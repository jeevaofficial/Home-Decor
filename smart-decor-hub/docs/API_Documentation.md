# API Documentation

Base URL: `http://localhost:5000/api`

---

## 1. Authentication (`/auth`)

### Register Admin/User
* **Route**: `POST /auth/register`
* **Access**: Public
* **Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "JWT_TOKEN_HERE"
  }
  ```

### Login User
* **Route**: `POST /auth/login`
* **Access**: Public
* **Payload**:
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword123"
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "JWT_TOKEN_HERE"
  }
  ```

---

## 2. Products (`/products`)

### Create Product
* **Route**: `POST /products`
* **Access**: Private (Admin Token required)
* **Payload**:
  ```json
  {
    "name": "Modern Glass Coffee Table",
    "category": "Furniture",
    "price": 299.99,
    "description": "Tempered glass coffee table with wood legs.",
    "image": "https://cloudinary.com/...",
    "stock": 15
  }
  ```
* **Response (210 Created)**: Product JSON object.

### Get All Products
* **Route**: `GET /products`
* **Access**: Public
* **Response (200 OK)**: Array of products.

### Get Product by ID
* **Route**: `GET /products/:id`
* **Access**: Public
* **Response (200 OK)**: Product object.

---

## 3. Categories (`/categories`)

### Create Category
* **Route**: `POST /categories`
* **Access**: Private (Admin Token required)
* **Payload**:
  ```json
  {
    "name": "Living Room Decor",
    "description": "Elegant accent decorations for modern spaces.",
    "image": "https://cloudinary.com/..."
  }
  ```

### Get All Categories
* **Route**: `GET /categories`
* **Access**: Public
* **Response (200 OK)**: Sorted category listing.

---

## 4. Inquiries (`/inquiries`)

### Submit Inquiry
* **Route**: `POST /inquiries`
* **Access**: Public
* **Payload**:
  ```json
  {
    "name": "John Customer",
    "phone": "+1234567890",
    "email": "john@gmail.com",
    "product": "60d0fe4f5311236168a109ca",
    "message": "Is this item available in matte black?"
  }
  ```

### Get Inquiries
* **Route**: `GET /inquiries`
* **Access**: Private (Admin Token required)
* **Response (200 OK)**: Sorted inquiries array.

---

## 5. Quotes (`/quotes`)

### Request Quote
* **Route**: `POST /quotes`
* **Access**: Public
* **Payload**:
  ```json
  {
    "customerName": "Alice Builder",
    "phone": "+1987654321",
    "product": "Custom Silk Rug",
    "amount": 1200
  }
  ```

### Get Quotes
* **Route**: `GET /quotes`
* **Access**: Private (Admin Token required)

### Update Quote Status
* **Route**: `PUT /quotes/:id`
* **Access**: Private (Admin Token required)
* **Payload**:
  ```json
  {
    "status": "Approved"
  }
  ```

---

## 6. Dashboard Statistics (`/dashboard`)

### Get Stats
* **Route**: `GET /dashboard`
* **Access**: Private (Admin Token required)
* **Response (200 OK)**:
  ```json
  {
    "totalProducts": 10,
    "totalInquiries": 4,
    "totalQuotes": 8,
    "totalCategories": 5,
    "recentQuotes": [...],
    "recentInquiries": [...],
    "quotesByStatus": {
      "pending": 5,
      "approved": 2,
      "rejected": 1
    }
  }
  ```

---

## 7. Image Uploads (`/upload`)

### Upload Image
* **Route**: `POST /upload`
* **Access**: Private (Admin Token required)
* **Format**: `multipart/form-data` with key `image` holding file content.
* **Response (201 Created)**:
  ```json
  {
    "imageUrl": "https://res.cloudinary.com/..."
  }
  ```
