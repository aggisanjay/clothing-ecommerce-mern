## 🛍️ Clothify — MERN E-Commerce Platform

A fully-functional MERN stack (MongoDB, Express, React, Node.js) e-commerce web application built for a fictional clothing brand.

This project supports:

✅ User authentication (JWT + HTTP-Only Cookies)

✅ Product browsing with search, filters & pagination

✅ Guest + Logged-in cart management

✅ Checkout & order creation

✅ Email confirmation using Brevo SMTP

✅ Secure backend APIs

✅ Production deployment (Vercel + Render)

## 📸 Live Demo

Frontend

➡️ https://clothing-ecommerce-mern.vercel.app

Backend API

➡️ https://clothing-ecommerce-mern-hr3u.vercel.app

## ✨ Features

👤 Authentication

Register & Login

JWT authentication stored in HTTP-Only cookies

Protected routes for cart & orders

Secure logout clears cookies correctly

# 🛒 Shopping Experience

Browse 20+ products seeded in MongoDB

Search

Category filter

Price filter

Pagination

# 🧺 Cart System

Works for:

Guests → localStorage

Logged-in users → MongoDB Cart collection

Syncs local cart into DB upon login

Quantity management

Remove items

Total price auto calculation

# 📦 Orders

Checkout endpoint validates and saves order

Cart clears after placing order

Order history view available

# 📧 Email Notifications

Real transactional email using Brevo SMTP

Contents:

Order ID

Date

Item list

Total amount

Delivered to customer's actual inbox on order placement.

#🛠 Tech Stack

Frontend

React (Vite)

React Router v6

Context API

Axios

Tailwind CSS

Lucide Icons

shadcn/ui components

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose ODM

JWT Authentication

bcrypt for password hashing

Nodemailer with Brevo SMTP

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

# ⚙️ Setup Instructions

✅ Backend Setup

cd backend

npm install


Create .env file:

PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

JWT_SECRET=YOUR_SECRET_KEY

EMAIL_HOST=smtp-relay.brevo.com

EMAIL_PORT=587

EMAIL_USER=YOUR_BREVO_SMTP_LOGIN

EMAIL_PASS=YOUR_BREVO_SMTP_API_KEY


Run server:

npm run dev

✅ Seed Products

Populate 20+ demo products into MongoDB:

node seedProducts.js

✅ Frontend Setup

cd frontend

npm install

npm run dev

# 🔌 API Overview

# Authentication

Method	Route

POST	/api/auth/register

POST	/api/auth/login

POST	/api/auth/logout

GET	/api/auth/me

# Products

Method	Route

GET	/api/products

GET	/api/products/:id

Supports:

?search=

&category=

&minPrice=

&maxPrice=

&page=

&limit=

# Cart

Method	Route

POST	/api/cart/add

PUT	/api/cart/update

DELETE	/api/cart/remove

GET	/api/cart

# Orders

Method	Route

POST	/api/orders

# 🔐 Security Features

Password hashing with bcrypt

JWT stored in HTTP-only cookies

CORS whitelist + credentials support

Role-safe protected routes

Secure cookie settings for production:

sameSite=None

secure=true

## Screenshots

# Home

<img width="1116" height="405" alt="image" src="https://github.com/user-attachments/assets/c63e700e-780a-4486-b8fd-45ce7393df58" />

# Login

<img width="529" height="300" alt="image" src="https://github.com/user-attachments/assets/3ff8bd7b-e397-4f3a-954e-def78d1723f0" />

# products

<img width="1067" height="1698" alt="image" src="https://github.com/user-attachments/assets/25d16f86-a6f4-4053-ac9f-b1a0cf8bd1e9" />

# Product details

<img width="1153" height="500" alt="image" src="https://github.com/user-attachments/assets/bc01edbb-3ad7-436b-8739-97b685451147" />

# Cart

<img width="1040" height="373" alt="image" src="https://github.com/user-attachments/assets/324d6c07-71a9-4ba5-849d-b96401cfe147" />

# Checkout

<img width="998" height="361" alt="image" src="https://github.com/user-attachments/assets/e7acf8ea-72ee-41c0-b12b-5eea0202b97d" />

# Order placed

<img width="812" height="286" alt="image" src="https://github.com/user-attachments/assets/c7e9a13f-597e-44bd-b6bf-1494f8571922" />



👨‍💻 Author

Sanjay Aggi
Full Stack MERN Developer
