const Card = require('../models/cards');

const ERROR_CODE = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Передан некорректный _id' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }

      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      }

      return res.status(ERROR_DEFAULT).send({ message: 'Что-то пошло не так...' });
    });
};
