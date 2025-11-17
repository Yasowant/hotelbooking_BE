// src/server.js
const express = require("express");
const config = require("./config");
const cookieParser = require("cookie-parser");
const db = require("./db/pool");
const createTables = require("./db/init");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);

// Start server
const port = config.port;

app.listen(port, async () => {
  console.log(`🚀 Server running on port ${port}`);

  try {
    // Test a simple DB query (safe + ensures connection works)
    await db.query("SELECT NOW()");
    console.log("📦 PostgreSQL Connected Successfully!");

    // Create tables
    await createTables();
  } catch (error) {
    console.error("❌ Error during startup:", error.message);
    process.exit(1); // stop server on fatal error
  }
});
