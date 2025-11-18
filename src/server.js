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

// ✅ Enable CORS for client
app.use(
  cors({
    origin: config.clientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies
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

  try {
    await db.query("SELECT NOW()");
    console.log("📦 PostgreSQL Connected Successfully!");

    await createTables();
  } catch (error) {
    console.error("❌ Error during startup:", error.message);
    process.exit(1);
  }
});
