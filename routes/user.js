const { Router } = require('express');

const userRouter = Router();
const {
  getUsers, getUser, createUser, patchUser, patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUser);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', patchUser);

userRouter.patch('/users/me/avatar', patchUserAvatar);

module.exports = userRouter;
