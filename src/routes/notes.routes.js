const { Router } = require('express');
const notesRoutes = Router();

const NotesController = require('../controllers/notesController');
const notesController = new NotesController();


notesRoutes.post('/:id', notesController.create);
notesRoutes.get('/:id', notesController.read);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes