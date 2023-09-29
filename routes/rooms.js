const router = require("express").Router();
const {
  getRooms,
  addRoom,
  deleteRoom,
  editRoomInfo,
  getRoom,
} = require("../controllers/rooms");
const validator = require("../middlewares/validation");

// const { editRoomInfo } = require("../controllers/users");

router.get("/", getRooms);
router.post("/:_id", addRoom);
router.delete("/:id", validator.deletedRoomJoi, deleteRoom);
router.patch("/:_id", editRoomInfo);
router.get("/:_id", getRoom);

module.exports = router;
