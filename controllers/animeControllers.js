const AnimeEntry = require("../models/animeModel");
const asyncHandler = require("express-async-handler");

const getAnimeList = asyncHandler(async (req, res) => {
  const animeList = await AnimeEntry.find({ user: req.user._id });

  res.send(animeList);
});

const addAnime = asyncHandler(async (req, res) => {
  const {
    title,
    status,
    score,
    episodeProgress,
    image,
    animeID,
    startDate,
    endDate,
    episodeCount,
    animeType,
    note,
  } = req.body;

  if (!title || !animeID) {
    res.status(400);
    throw new Error("Insufficient data provided.");
  } else {
    const anime = await AnimeEntry.create({
      title,
      status,
      score,
      episodeProgress,
      image,
      animeID,
      startDate,
      endDate,
      episodeCount,
      animeType,
      note,
      user: req.user._id,
    });

    const savedEntry = await anime.save();

    res.status(201).send(savedEntry);
  }
});

const deleteAnime = asyncHandler(async (req, res) => {
  const anime = await AnimeEntry.findById(req.params.id);

  if (anime.user.toString() !== req.user._id.toString()) {
    res.status(401);
    res.send("You cannot perform this action.");
  }

  if (anime) {
    await anime.remove();
    res.send("Anime has been removed from your list.");
  } else {
    res.status(404);
    throw new Error("Anime not found.");
  }
});

const updateAnime = asyncHandler(async (req, res) => {
  const anime = await AnimeEntry.findById(req.params.id);
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "status",
    "score",
    "episodeProgress",
    "startDate",
    "endDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (anime.user.toString() !== req.user._id.toString()) {
    res.status(401);
    res.send("You cannot perform this action.");
  }

  if (!isValidOperation) {
    res.status(400);
    throw new Error("Inalvalid updates.");
  }

  if (anime) {
    updates.forEach((update) => (anime[update] = req.body[update]));
    await anime.save();

    res.send(anime);
  } else {
    res.status(404);
    throw new Error("Anime not found");
  }
});

module.exports = { addAnime, getAnimeList, deleteAnime, updateAnime };
