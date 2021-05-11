import User from "../data_objects/IUser";

import { UserModel } from "../models/user_model";
import db from "../loaders/database";

export default class UserService{

    public async save(user: User): Promise<User> {
        try {
            const userData: UserModel = await db.User.findOne({where: {name: user.name}});
            if (userData) {
                const updatedUser: User = await userData.update(user, {where: {name: user.name}});
                return updatedUser;
            }

            const createdUser: User = await db.User.create(user);
            return createdUser;
        } catch (error) {
            return null;
        } 
     }

    public async delete(id: number): Promise<object> {
        try {
            const deletedId: number = await db.User.destroy({where: {id: id}});
            return deletedId > 0 ? {message: "success"} : {message: "error"};
        } catch (error) {
            return {message: "error"};
        }        
    }

    public async findAll(): Promise<Array<User>> {
        try {
            const movieData: Array<User> = await db.User.findAll();
            return movieData;
        } catch (error) {
            return null;
        }        
    }

    public async findById(id: number): Promise<User> {
        try {
            return await db.User.findByPk(id);
        } catch (error) {
            return null;
        }       
    }

    public async updatebyId(id: number, user:User): Promise<object> {
        try {
            const userData: UserModel = await db.User.findOne({where: {id: id}});
            const updatedUser: User = await userData.update(user, {where: {name: user.name}});
            return updatedUser;
        } catch (error) {
            return null;
        }   
    }

    // public async findMoviesByUserId(id: number): Promise<User> {
    //     try {
    //         return await db.User.findByPk(id, {include: [db.Movie]});
    //     } catch (error) {
    //         return null;
    //     }
    // }
}