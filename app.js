require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const routes = require("./routes");
const { PORT, URL } = require("./utils/config");
const limiter = require("./middlewares/rateLimiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const errorHandler = require("./middlewares/errorHandler");

mongoose.set("strictQuery", true);
mongoose
  .connect(URL)
  .then(() => {
    console.log("БД подключена");
  })
  .catch(() => {
    console.log("Не удалось подключиться к БД");
  });

const app = express();

const allowedCors = [
  "https://petprodject-hotelpanet.ru",
  "http://petprodject-hotelpanet.ru",
  "https://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Сервер подключён ...");
});
