const router = require("express").Router();
const { getRooms, addRoom, deleteRoom } = require("../controllers/rooms");
const validator = require("../middlewares/validation");

router.get("/", getRooms);
router.post("/", validator.addRoomsJoi, addRoom);
router.delete("/:_id", validator.deletedRoomJoi, deleteRoom);

module.exports = router;
