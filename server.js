const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const animeRoutes = require("./routes/animeRoutes");
const mangaRoutes = require("./routes/mangaRoutes");

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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
