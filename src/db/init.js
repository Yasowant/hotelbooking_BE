// src/db/init.js
const fs = require("fs");
const path = require("path");
const db = require("./pool");

const createTables = async () => {
  try {
    const filePath = path.join(__dirname, "../../sql/create_tables.sql");
    console.log("📄 SQL File Path:", filePath);

    const sql = fs.readFileSync(filePath, "utf8");

    await db.query(sql);

    console.log("🛠️ SQL file executed. Tables checked/created successfully");
  } catch (err) {
    console.error("❌ Error executing SQL file:", err);
    throw err;
  }
};

module.exports = createTables;
