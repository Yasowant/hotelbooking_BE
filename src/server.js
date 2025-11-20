const express = require("express");
const config = require("./config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db/pool");
const createTables = require("./db/init");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const hotelImageRoutes = require("./routes/hotelImageRoutes");

const app = express();

// 🔥 Allowed origins from config (array)
const allowedOrigins = config.clientUrls;

// ✅ Dynamic CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(
        new Error("CORS blocked: " + origin + " is not allowed"),
        false
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/hotel-images", hotelImageRoutes);

// Start server
const port = config.port;

app.listen(port, async () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log("Allowed Origins:", allowedOrigins);

  try {
    await db.query("SELECT NOW()");
    console.log("📦 PostgreSQL Connected Successfully!");

    await createTables();
  } catch (error) {
    console.error("❌ Error during startup:", error.message);
    process.exit(1);
  }
});
