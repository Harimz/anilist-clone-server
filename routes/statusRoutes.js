const express = require("express");
const {
  postStatus,
  getStatusMessages,
  deleteStatusMessage,
  editStatusMessage,
} = require("../controllers/statusControllers");
const authRequired = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authRequired, postStatus);

router.get("/", authRequired, getStatusMessages);

router.delete("/:id", authRequired, deleteStatusMessage);

router.put("/:id", authRequired, editStatusMessage);

module.exports = router;
