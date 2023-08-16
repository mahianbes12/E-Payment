const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/UserController.js');

// Define routes for user resource
userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);
userRouter.post('/:id', userController.login);


module.exports = userRouter;