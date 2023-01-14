const knex = require('../database/knex')
const AppError = require('../utils/AppError');

class notesController{
    async create(request, response){
        const {title, description, rating, tags} = request.body;
        const {user_id} = request.params;

//--- Create Note
        const note_id = await knex('movie_notes').insert({title, description, rating, user_id});

//--- Create Tags
        const insertTags = tags.map(name => {
            return ({
                note_id,
                user_id,
                name
            });
        });
        await knex('tags').insert(insertTags)

        return response.json();   
    };

    async read(request, response){
        const{id} = request.params;
        
        const movie_note = await knex('movie_notes').where({id}).first();
        const tags = await knex('tags').where({note_id: id}).orderBy('name');

        return response.json({
            movie_note,
            tags
        });
    };

    async delete(request, response){
        const { id } = request.params;

        await knex('movie_notes').where({id}).delete();

        return response.json('Nota Deletada');
    };

    async search(request, response){
        const {user_id, title, tags} = request.query;

        let notes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
            notes = await knex('tags').select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.user_id",
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn('name', filterTags)
            .innerJoin('movie_notes', 'movie_notes.id', 'tags.note_id')
            .orderBy('movie_notes.title')
            
        } else{ 
            notes = await knex('movie_notes')
            .where({user_id})
            .whereLike("title", `%${title}%`)
            .orderBy('title')
        }

        const userTags = await knex('tags').where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)

            return{
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags);
    };



};


module.exports = notesController;