const express = require("express");
const {
  addManga,
  getMangaList,
  deleteManga,
  updateManga,
} = require("../controllers/mangaControllers");
const authRequired = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authRequired, getMangaList);

router.post("/", authRequired, addManga);

router.delete("/:id", authRequired, deleteManga);

router.put("/:id", authRequired, updateManga);

module.exports = router;
