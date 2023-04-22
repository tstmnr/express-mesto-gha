const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
const cardRouter = require('./routes/card')

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use((req, res, next) => {
  req.user = {
    _id: '6441a410ed438d2bd8ab74e5' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(userRouter);

app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
