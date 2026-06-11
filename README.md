# TrendKart 🛒

A modern full-stack e-commerce application built with the MERN stack, featuring secure authentication, cart and wishlist synchronization, product browsing, and a responsive shopping experience.

## 🌐 Live Demo

- Frontend: https://trendkart-client.vercel.app/
- Backend API: https://trendkart-sever.vercel.app/

---

## 📌 Overview

TrendKart is a production-style e-commerce application designed to demonstrate modern full-stack development practices using React, TypeScript, Express, MongoDB, Redux Toolkit, and TanStack Query.

The application supports both guest and authenticated user experiences, including cart and wishlist synchronization after login, secure authentication using HTTP-only cookies, and schema validation with Zod.

---

## ✨ Features

### Authentication & Security

- User Registration
- User Login & Logout
- JWT Authentication
- HTTP-Only Cookie Storage
- Protected API Routes
- Secure Password Hashing with bcrypt

### Product Management

- Product Listing
- Product Details Page
- Product Search
- Category-Based Products
- Pagination Support

### Shopping Cart

- Guest Cart using Redux Toolkit + LocalStorage
- User Cart stored in MongoDB
- Add to Cart
- Remove from Cart
- Increase / Decrease Quantity
- Clear Cart
- Automatic Cart Sync After Login

### Wishlist

- Guest Wishlist using Redux Toolkit + LocalStorage
- User Wishlist stored in MongoDB
- Add to Wishlist
- Remove from Wishlist
- Automatic Wishlist Sync After Login

### User Experience

- Responsive Design
- Loading States
- Error Handling
- Toast Notifications
- Optimized API State Management

---

## 🏗️ Tech Stack

### Frontend

- React.js
- TypeScript
- React Router DOM
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- HTTP-Only Cookies
- bcrypt

### Deployment

- Vercel (Frontend)
- Vercel (Backend)
- MongoDB Atlas

---

## 🔒 Security Features

- JWT-based Authentication
- HTTP-Only Cookies for Token Storage
- Password Hashing using bcrypt
- Protected Backend Routes
- User Authorization Checks
- Input Validation using Zod

---

## ⚡ State Management Strategy

### Client State

Managed using Redux Toolkit.

Examples:

- Guest Cart
- Guest Wishlist
- Local UI State

### Server State

Managed using TanStack Query.

Examples:

- Products
- Profile
- User Cart
- User Wishlist

Benefits:

- Automatic Caching
- Query Invalidation
- Refetching
- Reduced Boilerplate

---

## 🔄 Cart & Wishlist Synchronization

One of the key features of TrendKart is seamless guest-to-user synchronization.

### Example

1. User adds products to cart as a guest.
2. User logs in.
3. Guest cart items are automatically merged into the user's MongoDB cart.
4. Existing products increase quantity instead of being overwritten.

The same synchronization flow is implemented for wishlists.

---

## 📂 Project Structure
```bash

TrendKart/
│
├── client/
│ ├── api/              # API requests
│ ├── components/       # Reusable UI components
│ ├── hooks/            # Custom React hooks
│ ├── pages/            # Application pages
│ ├── routes/           # Route configuration
│ ├── schemas/          # Zod validation schemas
│ ├── store/            # Redux Toolkit store
│ ├── types/            # TypeScript types
│ └── utils/            # Helper functions
│
├── server/
│ ├── api/             # API routes
│ ├── config/          # Database & app configuration
│ ├── controllers/     # Business logic
│ ├── middleware/      # Authentication middleware
│ └── models/          # MongoDB models
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/karthikeyan-jdev/trendkart.git
cd TrendKart
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=8000

MONGO_URI= ***

JWT_SECRET= ***

CLIENT_URL=http://localhost:5173
```

---

## 🎯 What This Project Demonstrates

- Full-Stack MERN Development
- REST API Design
- Authentication & Authorization
- Secure Cookie-Based JWT Authentication
- MongoDB Data Modeling
- Redux Toolkit State Management
- TanStack Query Server State Management
- Form Handling with React Hook Form
- Schema Validation with Zod
- Deployment & Production Configuration
- Guest-to-User Data Synchronization

---

## 👨‍💻 Author

**Karthikeyan P**

Full Stack MERN Developer

- GitHub: https://github.com/YOUR_USERNAME
- LinkedIn: https://linkedin.com/in/YOUR_LINKEDIN

If you found this project useful, consider giving it a ⭐ on GitHub.
