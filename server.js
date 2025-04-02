const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const authRoutes = require("./routes/auth");
const instituteRoutes = require("./routes/institute");
const programRoutes = require("./routes/program");
const applicationRoutes = require("./routes/application");
const adminRoutes = require("./routes/admin");


const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/institute", instituteRoutes);
app.use("/api/program", programRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes); // Assuming you have admin routes

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log("Database synced successfully");
});

module.exports = app;
