require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const ServerError = require('./errors/server-err');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { validateUser, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// команда для подключения с локальной машины к удаленной базе данных на порт 9912
// ssh -L 9912:localhost:27017 al-mysri@51.250.14.6

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем логгер запросов
app.use(requestLogger);

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

// авторизация
app.use(auth);

// роуты, которым нужна авторизация
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => {
  throw new NotFoundError('Страница не найдена');
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());
app.use(ServerError);

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT}`);
});
