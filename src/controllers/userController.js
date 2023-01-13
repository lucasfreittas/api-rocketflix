const AppError = require('../utils/AppError');

class userController{
    async create(request, response){
        return response.json('Cheguei')
    };

    async update(request, response){
        return response.json('Cheguei')
    };
};


module.exports = userController;