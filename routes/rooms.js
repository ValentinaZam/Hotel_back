const router = require("express").Router();
const {
  getRooms,
  addRoom,
  deleteRoom,
  editRoomInfo,
  getRoom,
  addNewRoom,
} = require("../controllers/rooms");
const validator = require("../middlewares/validation");

// const { editRoomInfo } = require("../controllers/users");

router.get("/", getRooms);
router.post("/:_id", addRoom);
router.delete("/:id", validator.deletedRoomJoi, deleteRoom);
router.patch("/:_id", editRoomInfo);
router.get("/:_id", getRoom);
router.post("/", addNewRoom);

module.exports = router;
