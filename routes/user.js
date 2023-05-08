/* eslint-disable import/no-extraneous-dependencies */
const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const userRouter = Router();
const {
  getUsers, getUser, patchUser, getCurrentUser, patchUserAvatar,
} = require('../controllers/users');
const RegExHttp = require('../utils/RegEx');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

userRouter.get('/users/me', getCurrentUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(RegExHttp),
  }),
}), patchUserAvatar);

module.exports = userRouter;
