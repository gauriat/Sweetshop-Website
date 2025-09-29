# 🍬 Mithaas & Memories – Sweet Shop Management App

A full-stack MERN application for managing and ordering sweets online.  
This project includes:

- **Frontend:** React (UI for customers & admins)
- **Backend:** Node.js + Express (APIs for products, users, and orders)
- **Database:** MongoDB
- **Authentication:** JWT-based (with role-based access for admins)

---

## 🚀 Features

### 👥 User
- Register & Login with JWT authentication
- Browse sweets with images, description, stock, and price
- Add sweets to cart & place orders

### 🛠️ Admin
- Manage sweets (CRUD: Create, Read, Update, Delete)
- Manage users (make/remove admin access)
- Dashboard to track sweets inventory
- Secure admin-only routes

---

## ⚙️ Installation

### 1️⃣ Clone the repository

- git clone [https://github.com/<your-username>/sweetshop-app.git](https://github.com/gauriat/Sweetshop-Website.git)
- cd sweetshop-app

### 2️⃣ Backend setup

- cd backend
- npm install
- Create a .env file in /backend: with details of PORT, MONGO_URI, JWT_SECRET
- Run backend: npm run dev

### 3️⃣ Frontend setup

- cd ../frontend
- npm install
- Run frontend:
- npm start

### 🖥️ Usage

- Open http://localhost:3000 → Frontend
- Backend API runs on http://localhost:5000
- Login as admin to manage sweets and users
- Login as user to browse & order sweets

---

## ⚡ Scalability & Deployment

- **Database Scaling:** MongoDB Atlas cluster with sharding & replicas for high availability.
- **Caching:** Redis for frequently accessed sweets/product data.
- **Load Balancing:** Nginx or AWS ELB to handle traffic spikes.
- **Containerization:** Dockerized backend & frontend for portability.
- **Cloud Deployment:** Backend on Render/Heroku, frontend on Netlify/Vercel.
- **Monitoring:** Use tools like PM2, New Relic, or Datadog for uptime & performance.

