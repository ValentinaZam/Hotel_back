const Room = require("../models/room");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictingError = require("../errors/ConflictError");
const {
  // HTTP_STATUS_CREATED,
  NO_RIGHTS_TO_DELETE_ROOM,
  INCORRECT_ROOM_DATA,
  ROOM_NOT_FOUND,
  INCORRECT_UPDATE_USER_DATA,
  EMAIL_ALREADY_REGISTERED,
  USER_NOT_FOUND,
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
  const { _id } = req.params;
  // const owner = "6509c8094919a94a857f7656";
  const roomData = req.body;
  Room.findByIdAndUpdate(_id, roomData, {
    new: true,
  })
    .then((room) => {
      if (!room) throw new NotFoundError(USER_NOT_FOUND);
      res.send(room);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingError(EMAIL_ALREADY_REGISTERED));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(INCORRECT_UPDATE_USER_DATA));
      }
      return next(err);
    });
  // Room.create(roomData)
  //   .then((room) => room.populate("owner"))
  //   .then((populatedRoom) => res.status(HTTP_STATUS_CREATED).send(populatedRoom))
  //   .catch((err) => {
  //     if (err.name === "ValidationError") {
  //       return next(new BadRequestError(INCORRECT_ROOM_DATA));
  //     }
  //     return next(err);
  //   });
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

const editRoomInfo = (req, res, next) => {
  const { _id } = req.params;
  const updateData = req.body;
  Room.findByIdAndUpdate(_id, updateData, {
    new: true,
  })
    .then((room) => {
      if (!room) throw new NotFoundError(USER_NOT_FOUND);
      res.send(room);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingError(EMAIL_ALREADY_REGISTERED));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(INCORRECT_UPDATE_USER_DATA));
      }
      return next(err);
    });
};

// const getRoom = (req, res, next) => {
//   const userId = req.user._id;
//   Room.findById(userId)
//     .then((room) => {
//       if (!room) throw new NotFoundError(USER_NOT_FOUND);
//       return res.send(room);
//     })
//     .catch((err) => {
//       if (err.name === "CastError") {
//         return next(new BadRequestError("404"));
//       }
//       return next(err);
//     });
// };

// eslint-disable-next-line consistent-return
const getRoom = async (req, res) => {
  try {
    const { _id } = req.params;
    const room = await Room.findById(_id);
    if (!room) {
      return res.status(404).json({ message: "Комната не найдена" });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};

module.exports = {
  getRooms,
  addRoom,
  deleteRoom,
  editRoomInfo,
  getRoom,
};
