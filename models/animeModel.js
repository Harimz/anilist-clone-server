const mongoose = require("mongoose");

const animeEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  episodeProgress: {
    type: Number,
    required: false,
    default: 0,
  },
  image: {
    type: String,
    required: false,
    default:
      "https://www.spearsandcorealestate.com/wp-content/themes/spears/images/no-image.png",
  },
  animeID: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const AnimeEntry = mongoose.model("AnimeEntry", animeEntrySchema);

module.exports = AnimeEntry;
