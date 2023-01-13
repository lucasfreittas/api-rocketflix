const { Router } = require('express');
const routes = Router();

const userRoutes = require('./user.routes');
const notesRoutes = require('./notes.routes');

routes.use('/user', userRoutes);
routes.use('/notes', notesRoutes);

module.exports = routes;