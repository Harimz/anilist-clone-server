const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  statusMessage: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
