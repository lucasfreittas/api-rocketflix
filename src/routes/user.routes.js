const { Router } = require('express');
const userRoutes = Router();

const UserController = require('../controllers/userController');
const userController = new UserController();

const checkToken = require('../middlewares/checkToken');


userRoutes.get('/', userController.create )
userRoutes.put('/', checkToken, userController.update )

module.exports = userRoutes