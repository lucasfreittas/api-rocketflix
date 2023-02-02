const { Router } = require('express');
const notesRoutes = Router();

const NotesController = require('../controllers/notesController');
const notesController = new NotesController();

const checkToken = require('../middlewares/checkToken');

notesRoutes.use(checkToken)

notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.read);
notesRoutes.get('/', notesController.search);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes