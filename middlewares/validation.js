const { celebrate, Joi } = require("celebrate");

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const registrationUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const addRoomsJoi = celebrate({
  body: Joi.object().keys({
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    roomId: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    status: Joi.boolean().required(),
    owner: Joi.string(),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const deletedRoomJoi = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  URL_REGEX,
  updateUserJoi,
  addRoomsJoi,
  deletedRoomJoi,
  registrationUserJoi,
  loginJoi,
};
