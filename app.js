const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const ERROR_NOT_FOUND = 404;

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.params);

  next();
});

app.use(userRouter, auth);

app.use(cardRouter, auth);

app.post('/signin', login);

app.post('/signup', createUser);

app.all('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app available on port: ', PORT);
});
