const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const auth = require("./routes/authRoutes");
const destinationRoutes = require("./routes/admindestinationRoutes");
const blogRoutes = require("./routes/adminblogRoutes");
const userRoutes = require("./routes/adminRoutes");
const publicBlogRoutes = require("./routes/userblogRoutes");
const publicDestinationRoutes = require("./routes/userdestination");
const contactRoutes = require("./routes/contactRoutes");
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://budgettravelling.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", auth); // Authentication routes
app.use("/api/admin/blogs", blogRoutes); // Blog management routes for admin
app.use("/api/admin/destinations", destinationRoutes); // Destination management routes for admin
app.use("/api/admin", userRoutes); // User management routes for admin
// app.use("/api/admin", userRoutes);
app.use("/api/user/blogs", publicBlogRoutes);
app.use("/api/user/destinations", publicDestinationRoutes);
// app.use("/api/user/blogs", publicBlogRoutes);
// app.use("/api/user/destinations", publicDestinationRoutes);
app.use("/api/contact", contactRoutes); // Contact form routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
