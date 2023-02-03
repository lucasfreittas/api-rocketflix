const { Router } = require('express');
const userRoutes = Router();

const UserController = require('../controllers/userController');
const userController = new UserController();
const AvatarController = require('../controllers/avatarController');
const avatarController = new AvatarController();

const checkToken = require('../middlewares/checkToken');

const multer = require('multer');
const uploadConfig = require('../configs/uploads');
const upload = multer(uploadConfig.MULTER);


userRoutes.post('/', userController.create )
userRoutes.put('/', checkToken, userController.update )
userRoutes.patch('/avatar', checkToken, upload.single('avatar'), avatarController.update);

module.exports = userRoutes