const express = require("express");
const {
  addAnime,
  getAnimeList,
  deleteAnime,
  updateAnime,
} = require("../controllers/animeControllers");
const authRequired = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authRequired, getAnimeList);

router.post("/", authRequired, addAnime);

router.delete("/:id", authRequired, deleteAnime);

router.patch("/:id", authRequired, updateAnime);

module.exports = router;
