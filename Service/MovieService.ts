import Movie from "../data_objects/IMovie";
import { MovieModel } from "../models/movie_model";
import db from "../loaders/database";
import Genre from "../data_objects/Genre";
import Rating from "../data_objects/Rating";
const { Op } = require("sequelize");

export default class MovieService {

    public async save(movie: Movie): Promise<Movie> {
        try {
            console.log(movie)
            const movieData: MovieModel = await db.Movie.findOne({where: {name: movie.name, user_id:movie.user_id}});
            if (movieData) {
                const updatedMovie: Movie = await movieData.update(movie, {where: {name: movie.name, user_id:movie.user_id}});
                return updatedMovie;
            }
            const createdMovie: Movie = await db.Movie.create(movie);
            return createdMovie; 
        } catch (error) {
            return null;
        }        
     }

    public async delete(id: number): Promise<object> {
        try {
            const deletedId: number = await db.Movie.destroy({where: {id: id}});
            return deletedId > 0 ? {type: "success"} : {type: "error"};
        } catch (error) {
            return null;
        }   
    }

    public async updatebyId(id: number, movie:Movie): Promise<object> {
        try {
            const movieData: MovieModel = await db.Movie.findOne({where: {id: id}});
            const updatedMovie: Movie = await movieData.update(movie, {where: {name: movie.name}});
            return updatedMovie;
        } catch (error) {
            return null;
        }   
    }

    public async findAll(): Promise<Array<Movie>> {
        try {

            const movieData: Array<Movie> = await db.Movie.findAll();
            return movieData; 
        } catch (error) {
            return null;
        }        
    }

    public async findById(id: number): Promise<Movie> {
        try {
            return await db.Movie.findByPk(id);
        } catch (error) {
            return null;
        }   
    }

    public async findGenreById(id: number): Promise<Genre> {
        try {
            return await db.Genre.findByPk(id);
        } catch (error) {
            return null;
        }   
    }

    public async findRatingById(id: number): Promise<Rating> {
        try {
            return await db.Rating.findOne({where: {movie_id: id}});
        } catch (error) {
            return null;
        }   
    }

    public async findByUser(id: number): Promise<Array<Movie>> {
        try {
            return await db.Movie.findAll({where: {user_id: id}});
        } catch (error) {
            return null;
        }   
    }
    
    public async findByName(name: string): Promise<Movie> {
        try {
            let part_string='%'.concat(name).concat('%');
            return await db.Movie.findOne({where: {name: {[Op.iLike] : part_string}}});
        } catch (error) {
            return null;
        }   
    }
}