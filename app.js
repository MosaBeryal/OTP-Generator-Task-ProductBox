const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

// middleware
app.use(express.json());

// user routes
const userRoutes = require("./routes/user.routes");

// Use the user routes
app.use("/api", userRoutes);

// Handle incorrect routes and set status to 404
app.all("*", (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public", "error.html"));
});

// Start the server
const db = require("./config/db");
app.listen(port, async () => {
  try {
    // Initialize the database and sync models
    db.sequelize.sync({ alter: false });
    // await db.databaseLoader();

    console.log("Database synchronized and server is running on port", port);
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
});
