const Room = require("../models/room");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const {
  HTTP_STATUS_CREATED,
  NO_RIGHTS_TO_DELETE_ROOM,
  INCORRECT_ROOM_DATA,
  ROOM_NOT_FOUND,
} = require("../utils/constants");

const getRooms = (req, res, next) => {
  // const userId = req.user._id;

  Room.find({})
    // .populate("owner")
    .then((rooms) => res.send(rooms))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(INCORRECT_ROOM_DATA));
      }
      return next(err);
    });
};

const addRoom = (req, res, next) => {
  const owner = req.user._id;
  const roomData = { ...req.body, owner };

  Room.create(roomData)
    .then((room) => room.populate("owner"))
    .then((populatedRoom) => res.status(HTTP_STATUS_CREATED).send(populatedRoom))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(INCORRECT_ROOM_DATA));
      }
      return next(err);
    });
};

const deleteRoom = (req, res, next) => {
  const { _id: roomId } = req.params;
  Room.findById(roomId)
    .then((room) => {
      if (!room) throw new NotFoundError(ROOM_NOT_FOUND);

      const ownerId = room.owner.valueOf();
      const userId = req.user._id;

      if (ownerId !== userId) {
        return next(new ForbiddenError(NO_RIGHTS_TO_DELETE_ROOM));
      }
      return room.deleteOne();
    })
    .then((deletedRoom) => res.send(deletedRoom))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new BadRequestError(INCORRECT_ROOM_DATA));
      }
      return next(err);
    });
};

module.exports = {
  getRooms,
  addRoom,
  deleteRoom,
};
