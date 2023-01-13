const knex = require('../database/knex')
const AppError = require('../utils/AppError');

class notesController{
    async create(request, response){

        return response.json('Nota Criada')
    };

    async read(request, response){
        return response.json('Nota Lida')
    };

    async delete(request, response){
        return response.json('Nota Deletada')
    };
};


module.exports = notesController;