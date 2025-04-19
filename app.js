require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./config/logger");
const { sequelize } = require("./models");
const routes = require("./routes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Logging only in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // You can change to 'tiny' if you want even less logs
}

// Mount routes
app.use("/api", routes);

// Global error handler
app.use(errorMiddleware.globalErrorHandler);

app.get("/", (req, res) => {
  res.send("DevTasker API is running!");
});

// Start the server and connect DB
const startServer = async () => {
  try {
    console.log("⏳ Connecting to DB...");
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    console.log("⏳ Syncing DB...");
    await sequelize.sync({ force: false });
    console.log("✅ DB sync complete");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
