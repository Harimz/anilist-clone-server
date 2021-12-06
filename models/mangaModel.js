const mongoose = require("mongoose");

const mangaEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "Plan to Read",
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  volumesRead: {
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
  mangaID: {
    type: String,
    required: true,
  },
  volumeCount: {
    type: Number,
    required: false,
    default: 0,
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
  mangaType: {
    type: String,
    required: true,
    default: "NA",
  },
  note: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const MangaEntry = mongoose.model("MangaEntry", mangaEntrySchema);

module.exports = MangaEntry;
