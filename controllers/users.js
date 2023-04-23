const User = require('../models/users');
const ERROR_CODE = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' }));
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Передан некорректный _id' });
      }

      res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => res.status(200).send({ data: user }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
    }

    res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
  });
}

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }

      res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
}

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }

      res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
}

