# 🌐 **Hotel Booking API**

A production-ready backend built with **Node.js, Express, PostgreSQL**, and **JWT Authentication** (Access Token + Refresh Token) including hotel management, rooms, bookings, payments, reviews, wishlist, inventory, and admin/owner features.

---

## 📁 **Project Structure**

```
express-pg-auth/
│
├── src/
│   ├── config/
│   │   └── index.js
│   ├── db/
│   │   ├── pool.js
│   │   └── init.js
│   ├── sql/
│   │   └── create_tables.sql
│   ├── models/
│   ├── services/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 🚀 **Features**

### 🧑‍💻 Authentication

* Register (user or owner)
* Login (Access Token + Refresh Token)
* Auto token refresh (httpOnly cookie)
* Secure logout
* Role-based access (user / owner / admin)

### 🏨 Hotels Module

* Owners can create hotels
* Upload hotel images
* Add amenities
* Manage rooms & pricing
* Daily inventory tracking

### 🛏️ Rooms & Availability

* Room types (Standard, Deluxe, Suite…)
* Per-day availability tracking (inventory)
* Real-time availability checking

### 📚 Bookings

* Create and cancel bookings
* Price calculation
* Track status (pending, confirmed, cancelled)

### 💳 Payments

* Attached to booking
* Status: pending / completed / failed

### ⭐ Reviews

* Users can review hotels
* 1–5 star ratings

### ❤️ Wishlist

* Add/remove hotels from favorites

### 🔔 Notifications

* Server-triggered user notifications

---

# 🛠️ **Tech Stack**

| Part       | Technology                                 |
| ---------- | ------------------------------------------ |
| Server     | Node.js, Express.js                        |
| Database   | PostgreSQL                                 |
| Auth       | JWT (Access + Refresh Token)               |
| Hashing    | Bcrypt                                     |
| DB Pooling | `pg` library                               |
| UUID       | `pgcrypto` extension (`gen_random_uuid()`) |
| Validation | express-validator                          |

---

# 📦 **Installation**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/hotel-booking-api.git
cd hotel-booking-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

# 🔐 **Environment Variables (.env)**

Create `.env` file:

```env
PORT=4000

# PostgreSQL
DATABASE_URL=postgres://user:password@localhost:5432/hotelappdb
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_NAME=hotelappdb
DB_PORT=5432

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d

# Bcrypt
BCRYPT_SALT_ROUNDS=12

COOKIE_SECURE=false
CLIENT_URL=http://localhost:3000
```

---

# 🗄️ **Database Setup**

### Run the SQL migration file:

```bash
psql -U postgres -d hotelappdb -f ./src/sql/create_tables.sql
```

Or automatically at server startup:

```js
require("./db/init")();
```

---

# 🧱 **Database Schema Includes**

✔ Users
✔ Refresh Tokens
✔ Hotels
✔ Hotel Images
✔ Amenities
✔ Hotel-Amenities Mapping
✔ Rooms
✔ Room Inventory (per day)
✔ Bookings
✔ Payments
✔ Reviews
✔ Wishlist
✔ Notifications

Complete SQL file:
`src/sql/create_tables.sql`

---

# ▶️ **Run the Server**

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server starts at:

```
http://localhost:4000
```

---

# 🧪 **API Endpoints Overview**

## 🔐 Auth Routes

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register user/owner          |
| POST   | `/api/auth/login`    | Login + returns access token |
| POST   | `/api/auth/refresh`  | Refresh access token         |
| POST   | `/api/auth/logout`   | Revoke refresh token         |

---

## 🏨 Hotel Routes (Owner Only)

| Method | Endpoint                    | Description    |
| ------ | --------------------------- | -------------- |
| POST   | `/api/hotels`               | Create a hotel |
| POST   | `/api/hotels/:id/images`    | Upload image   |
| POST   | `/api/hotels/:id/amenities` | Add amenities  |

---

## 🛏️ Room Routes (Owner Only)

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | `/api/hotels/:hotelId/rooms`   |
| POST   | `/api/rooms/:roomId/inventory` |

---

## 📚 Booking Routes

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/bookings`    |
| GET    | `/api/bookings/my` |

---

## ⭐ Review Routes

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | `/api/hotels/:id/reviews` |

---

## ❤️ Wishlist

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | `/api/wishlist/:hotelId` |
| GET    | `/api/wishlist`          |

---

# 🔐 **Role-Based Access Control (RBAC)**

User roles:

* `user` → book hotels
* `owner` → manage hotels & rooms
* `admin` → system control

### Example Owner Middleware:

```js
module.exports = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({ message: "Owner access required" });
  }
  next();
};
```

---

# 📂 **Scripts**

### Development:

```bash
npm run dev
```

### Build:

```bash
npm run build
```

### Start:

```bash
npm start
```

---

# 🧬 **Future Enhancements**

* Payment Gateway Integration
* Search + Filters (price, date, location)
* Admin Dashboard
* Push Notifications
* Multi-image upload
* Seasonal pricing

---

# 🏁 **Conclusion**

This backend provides a fully scalable, secure, and production-ready API for a **Hotel Booking System** from scratch using Node.js + PostgreSQL.
It includes complete authentication, authorization, hotel/booking management, payments, reviews, and business logic.

