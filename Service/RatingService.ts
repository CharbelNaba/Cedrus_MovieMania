import Rating from "../data_objects/IRating";

import { RatingModel } from "../models/rating_model";
import db from "../loaders/database";

export default class RatingService{

    public async save(rating: Rating): Promise<Rating> {
        try {
            const ratingData: RatingModel = await db.Rating.findOne({where: {movie_id: rating.movie_id}});
            if (ratingData) {
                const updatedRating: Rating = await ratingData.update(rating, {where: {movie_id: rating.movie_id}});
                return updatedRating;
            }

            const createdRating: Rating = await db.Rating.create(rating);
            return createdRating;
        } catch (error) {
            return null;
        } 
     }

    public async delete(id: number): Promise<object> {
        try {
            const deletedId: number = await db.Rating.destroy({where: {id: id}});
            return deletedId > 0 ? {message: "success"} : {message: "error"};
        } catch (error) {
            return {message: "error"};
        }        
    }

    public async findAll(): Promise<Array<Rating>> {
        try {
            const movieData: Array<Rating> = await db.Rating.findAll();
            return movieData;
        } catch (error) {
            return null;
        }        
    }

    public async findById(id: number): Promise<Rating> {
        try {
            return await db.Rating.findByPk(id);
        } catch (error) {
            return null;
        }       
    }

    public async findByUser(id: number): Promise<Array<Rating>> {
        try {
            const ratingData: Array<Rating> = await db.Rating.findAll({where: {user_id: id}});
            return ratingData;
        }
        catch(error){
            return null;
        }
    }

    public async updatebyId(id: number, rating:Rating): Promise<object> {
        try {
            const ratingData: RatingModel = await db.Rating.findOne({where: {id: id}});
            const updatedRating: Rating = await ratingData.update(rating, {where: {id: rating.id}});
            return updatedRating;
        } catch (error) {
            return null;
        }   
    }


}