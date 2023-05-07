const { Router } = require('express');

const userRouter = Router();
const {
  getUsers, getUser, patchUser, getCurrentUser, patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUser);

userRouter.patch('/users/me', patchUser);

userRouter.get('/users/me', getCurrentUser);

userRouter.patch('/users/me/avatar', patchUserAvatar);

module.exports = userRouter;
