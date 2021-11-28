const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["htpp://localhost:3000"],
  })
);

app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
