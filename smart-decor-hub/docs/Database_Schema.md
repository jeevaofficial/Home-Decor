# Database Schema Documentation

This document describes the Mongoose schemas and data relationships for the Smart Decor Hub application.

## 1. User Schema

Represents administrators and registered accounts.

- **Collection**: `users`
- **Fields**:
  - `name` (String, Required): Full name of the user.
  - `email` (String, Required, Unique, Lowercase): Log-in email.
  - `password` (String, Required): Hashed bcrypt password.
  - `role` (String, Default: `"admin"`): User authorization role (`admin` or `user`).
- **Timestamps**: Enabled (`createdAt`, `updatedAt`).

---

## 2. Product Schema

Represents decor and furniture products listed in the store.

- **Collection**: `products`
- **Fields**:
  - `name` (String, Required): Product name.
  - `category` (String, Required): Name or reference slug of the category.
  - `price` (Number, Required, Min: `0`): Pricing of the product.
  - `description` (String, Required): Product description.
  - `image` (String, Default: `""`): Cloudinary hosted URL for the product showcase.
  - `stock` (Number, Default: `0`): Quantity available.
- **Timestamps**: Enabled.

---

## 3. Category Schema

Represents product categories (e.g., Lighting, Rugs, Wall Decor).

- **Collection**: `categories`
- **Fields**:
  - `name` (String, Required, Unique): Display name of the category.
  - `slug` (String, Required, Unique, Lowercase): URL-safe slug generated from the name.
  - `description` (String, Default: `""`): Category details.
  - `image` (String, Default: `""`): Cloudinary banner image URL.
- **Timestamps**: Enabled.

---

## 4. Inquiry Schema

Represents general requests or questions sent by prospective customers regarding products.

- **Collection**: `inquiries`
- **Fields**:
  - `name` (String, Required): Sender name.
  - `phone` (String, Required): Contact phone number.
  - `email` (String, Default: `""`): Optional contact email.
  - `product` (String, Required): Name or ID of the product of interest.
  - `message` (String, Required): Detailed message.
  - `status` (String, Default: `"Pending"`): Handling status (e.g. `Pending`, `Reviewed`, `Archived`).
- **Timestamps**: Enabled.

---

## 5. Quote Schema

Represents formal custom quote requests submitted by users for specific products.

- **Collection**: `quotes`
- **Fields**:
  - `customerName` (String, Required): Customer name.
  - `phone` (String, Required): Contact phone.
  - `product` (String, Required): Target product.
  - `amount` (Number, Required): Quoted budget/amount.
  - `status` (String, Default: `"Pending"`): Flow status (`Pending`, `Approved`, `Rejected`).
- **Timestamps**: Enabled.
