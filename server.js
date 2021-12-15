const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const animeRoutes = require("./routes/animeRoutes");
const mangaRoutes = require("./routes/mangaRoutes");
const statusRoutes = require("./routes/statusRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/users", userRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/manga", mangaRoutes);
app.use("/api/status", statusRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log(`Server is running...`));
