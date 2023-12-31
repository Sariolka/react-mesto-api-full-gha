require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const router = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.use(helmet());
app.use(limiter);
mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту!`);
});
