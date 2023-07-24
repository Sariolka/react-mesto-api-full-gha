require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
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
app.use(requestLogger);
app.use(cors({
  origin: ['https://sariolka.student.nomoredomains.xyz', 'https://api.sariolka.students.nomoredomains.xyz',
    'http://sariolka.student.nomoredomains.xyz', 'http://api.sariolka.students.nomoredomains.xyz', 'localhost:3000',
    'http://localhost:3000', 'https://localhost:3000', 'localhost:3001', 'http://localhost:3001'],
  credentials: true,
}));

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
