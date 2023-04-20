const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    // данные о пользователях не получены, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    // данные о пользователях не получены, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body)

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
}