const knex = require('../database/knex')
const AppError = require('../utils/AppError');

class userController{
    async create(request, response){
        const {name, email, password} = request.body;

//---Checking if all fields are filled
        if(!name || !email || !password){
            throw new AppError('Please fill all informations')
        }

//---Checking if email is already registraded       
        const emailChecker = await knex('users').where({email}).first();
        if(emailChecker){
            throw new AppError('This email is already in use')
        };  
        
//---Adding user in table
        await knex('users').insert({
            name,
            email,
            password
        });

        return response.json()
    };


    async update(request, response){
        return response.json('Cheguei')
    };
};


module.exports = userController;