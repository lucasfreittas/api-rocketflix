const knex = require('../database/knex')
const AppError = require('../utils/AppError');
const {hash, compare} = require('bcryptjs');

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

//---Encrypting password      
       const hashedPassword = await hash(password, 8)

//---Adding user in table
        await knex('users').insert({
            name,
            email,
            password: hashedPassword
        });

        return response.json()
    };


    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const {id} = request.params;

        const user = await knex('users').where({id}).first()
       
//-----  Update email function

        if(email){
            const userByEmail = await knex('users').where({email}).first();
            if(userByEmail && userByEmail.id !== user.id){
                throw new AppError('Email já está em uso')
            }else{
                await knex('users').where({id}).first().update({email});
                }
            }
        
//-----  Update Name function

        if(name){
            await knex('users').where({id}).first().update({name});
        }


//-----  Edit password function

        if(password && !old_password){
            throw new AppError('Please insert the old password')
        }

        if(password && old_password){
        const user_password = await knex('users').where({id}).select('users.password').first()
        const checkerPassword = await compare(old_password, user_password.password)
        if(!checkerPassword){
            throw new AppError('The passwords doesnt match')
        }

        const newPassword = await hash(password, 8)
        await knex('users').where({id}).first().update({password: newPassword});
        
        
        }
        return response.json();
    }
}


module.exports = userController;