const { Router } = require('express');
const userRoutes = Router();

const UserController = require('../controllers/userController');
const userController = new UserController();


userRoutes.get('/', userController.create )
userRoutes.put('/:id', userController.update )

module.exports = userRoutes