const mongoose = require("mongoose");
const { INCORRECT_URL_FORMAT } = require("../utils/constants");
const { URL_REGEX } = require("../middlewares/validation");

const roomsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: INCORRECT_URL_FORMAT,
    },
  },
  owner: {
    type: String,
    required: false,
  },
  roomId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

roomsSchema.statics.findUserByCredentials = function findUserByCredentials(status) {
  return this.findOne({ status })
    // .select("+password")
    .then((room) => {
      if (!room) {
        // throw new UnauthorizedError(INVALID_AUTH_CREDENTIALS);
        console.log("hgig");
      }
      return room;
    });
};

const Room = mongoose.model("room", roomsSchema);
module.exports = Room;
