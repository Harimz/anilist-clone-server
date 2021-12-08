const asyncHandler = require("express-async-handler");
const Status = require("../models/statusModel");

const getStatusMessages = asyncHandler(async (req, res) => {
  const messages = await Status.find({ user: req.user._id });

  res.send(messages);
});

const postStatus = asyncHandler(async (req, res) => {
  const { statusMessage } = req.body;

  if (!statusMessage) {
    res.status(400);
    throw new Error("Message must be provided.");
  }

  const status = await Status.create({
    statusMessage,
    user: req.user._id,
  });

  res.status(201).send(status);
});

const deleteStatusMessage = asyncHandler(async (req, res) => {
  const statusMessage = await Status.findById(req.params.id);

  if (statusMessage.user.toString() !== req.user._id.toString()) {
    res.status(401);
    res.send("You cannot perform this action");
  }

  if (statusMessage) {
    await statusMessage.remove();
    res.send("Message has been removed");
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

const editStatusMessage = asyncHandler(async (req, res) => {
  const status = await Status.findById(req.params.id);
  const { updatedMessage } = req.body;

  if (status.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action.");
  }

  if (!updatedMessage) {
    res.status(400);
    res.send("Invalid updates");
  }

  if (status) {
    status.statusMessage = updatedMessage;

    await status.save();

    res.send(status);
  } else {
    res.status(404);
    throw new Error("Status message not found");
  }
});

module.exports = {
  postStatus,
  getStatusMessages,
  deleteStatusMessage,
  editStatusMessage,
};
