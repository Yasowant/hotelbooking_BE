const express = require("express");
const config = require("./config");
const cookieParser=require("cookie-parser")
const db = require("./db/pool");
const createTables = require("./db/init");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", authRoutes);

// Start server
const port = config.port;
app.listen(port, async () => {
  console.log(`🚀 Server running on port ${port}`);

  // Try to connect to DB
  try {
    await db.pool.connect();
    console.log("📦 PostgreSQL Connected Successfully!");
    await createTables();
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed!");
    console.error("Error:", error.message);
  }
});
