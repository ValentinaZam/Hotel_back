const mongoose = require("mongoose");
const { URL_REGEX, INCORRECT_URL_FORMAT } = require("../utils/constants");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
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
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: INCORRECT_URL_FORMAT,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: INCORRECT_URL_FORMAT,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;
