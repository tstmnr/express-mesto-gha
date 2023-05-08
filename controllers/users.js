/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const ERROR_CODE = 400;
const ERROR_CODE_401 = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => res.status(ERROR_CODE_401).send({ message: 'Что-то пошло не так...' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' }));
};

module.exports.getCurrentUser = (req, res) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Передан некорректный _id' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Передан некорректный _id' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};
