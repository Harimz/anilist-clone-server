const MangaEntry = require("../models/mangaModel");
const asyncHandler = require("express-async-handler");

const getMangaList = asyncHandler(async (req, res) => {
  const mangaList = await MangaEntry.find({ user: req.user._id });

  res.send(mangaList);
});

const addManga = asyncHandler(async (req, res) => {
  const {
    title,
    status,
    score,
    volumesRead,
    image,
    mangaID,
    startDate,
    endDate,
  } = req.body;

  if (!title || !status || !mangaID) {
    res.status(400);
    throw new Error("Insufficient data provided.");
  } else {
    const manga = await MangaEntry.create({
      title,
      status,
      score,
      volumesRead,
      image,
      mangaID,
      startDate,
      endDate,
      user: req.user._id,
    });

    const savedEntry = await manga.save();

    res.status(201).send(savedEntry);
  }
});

const deleteManga = asyncHandler(async (req, res) => {
  const manga = await MangaEntry.findById(req.params.id);

  if (manga.user.toString() !== req.user._id.toString()) {
    res.status(401);
    res.send("You cannot perform this action.");
  }

  if (manga) {
    await manga.remove();
    res.send("Manga has been removed from your list.");
  } else {
    res.status(404);
    throw new Error("Manga not found.");
  }
});

const updateManga = asyncHandler(async (req, res) => {
  const manga = await MangaEntry.findById(req.params.id);
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "status",
    "score",
    "volumesRead",
    "startDate",
    "endDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (manga.user.toString() !== req.user._id.toString()) {
    res.status(401);
    res.send("You cannot perform this action.");
  }

  if (!isValidOperation) {
    res.status(400);
    throw new Error("Inalvalid updates.");
  }

  if (manga) {
    updates.forEach((update) => (manga[update] = req.body[update]));
    await manga.save();

    res.send(manga);
  } else {
    res.status(404);
    throw new Error("Anime not found");
  }
});

module.exports = { addManga, getMangaList, deleteManga, updateManga };
