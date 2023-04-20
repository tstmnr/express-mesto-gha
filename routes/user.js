const { Router } = require('express')
const userRouter = Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUser);

userRouter.post('/users', createUser)

module.exports = userRouter;