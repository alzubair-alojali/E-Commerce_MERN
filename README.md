# E-Commerce Platform (MERN Stack)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Material UI](https://img.shields.io/badge/UI-Material%20UI-007FFF?logo=mui&logoColor=white)

> **Note:** [Placeholder for Banner/Screenshot]

## 📖 Project Overview

This is a robust, full-stack E-Commerce application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It is designed to provide a seamless shopping experience, featuring secure user authentication, dynamic product catalog management, a fully functional shopping cart, and order processing. The application leverages **TypeScript** across the entire stack for type safety and scalability, and utilizes **Material UI** for a polished, responsive user interface.

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Language:** TypeScript
- **State Management:** React Context API
- **Routing:** React Router DOM
- **UI Component Library:** Material UI (MUI) & Emotion
- **Styling:** Emotion Styled Components

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt
- **Language:** TypeScript

### DevOps & Tools
- **Development Server:** Vite (Frontend), Nodemon (Backend)
- **Linting:** ESLint

## ✨ Key Features

- **User Authentication:** Secure Sign Up and Login functionality using JWT and bcrypt password hashing.
- **Product Management:** Browse products with detailed views; backend support for product seeding.
- **Shopping Cart:** Persistent shopping cart functionality allowing users to add, update, and remove items.
- **Order System:** Checkout process and order history tracking (`MyOrderPage`, `OrderSuccessPage`).
- **Protected Routes:** Secure navigation ensuring only authenticated users can access specific pages (Checkout, Orders).
- **Responsive Design:** Mobile-friendly interface built with Material UI components.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection string)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alzubair-alojali/E-Commerce_MERN.git
   cd E-Commerce_MERN/E-Commerce
   ```

2. **Backend Setup**
   Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   Open a new terminal, navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the **backend** directory with the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for the backend server | `3000` |
| `DATABASE_URL` | MongoDB Connection String | `mongodb://localhost:27017/ecommerce` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your_super_secret_key` |

> Note: The frontend currently connects to `http://localhost:3000` by default.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   *Server will run on `http://localhost:3000`*

2. **Start the Frontend Client**
   ```bash
   cd frontend
   npm run dev
   ```
   *Client will typically run on `http://localhost:5173`*

## 🔌 API Endpoints

Here are the primary API routes available in the backend:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | | |
| `POST` | `/user/register` | Register a new user |
| `POST` | `/user/login` | Authenticate user and return JWT |
| **Products** | | |
| `GET` | `/product` | Fetch all available products |
| **Cart** | | |
| `GET` | `/cart` | Get current user's cart |
| `POST` | `/cart` | Add item to cart |
| `DELETE`| `/cart` | Remove item from cart (route logic dependent) |

## 📂 Folder Structure

A high-level overview of the project architecture:

```
E-commerce/
├── backend/                  # API and Server Logic
│   ├── src/
│   │   ├── middlewares/      # Request validators (e.g., validateJWT)
│   │   ├── models/           # Mongoose schemas (Cart, Order, Product, User)
│   │   ├── routes/           # Express route definitions
│   │   ├── services/         # Business logic layer
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                 # React Client Application
    ├── src/
    │   ├── components/       # Reusable UI components (Navbar, ProductCard)
    │   ├── context/          # Global State (AuthContext, CartContext)
    │   ├── pages/            # Application Views (Home, Checkout, Login)
    │   ├── types/            # TypeScript Interfaces
    │   ├── App.tsx           # Main App component
    │   └── main.tsx          # Client entry point
    ├── vite.config.ts
    └── package.json
```

---

**Developed by [Alzubair Alojali](https://github.com/alzubair-alojali)**
