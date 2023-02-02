const { Router } = require('express');
const routes = Router();

const userRoutes = require('./user.routes');
const notesRoutes = require('./notes.routes');
const sessionsRoutes = require('./sessions.routes');

routes.use('/user', userRoutes);
routes.use('/notes', notesRoutes);
routes.use('/sessions', sessionsRoutes);

module.exports = routes;