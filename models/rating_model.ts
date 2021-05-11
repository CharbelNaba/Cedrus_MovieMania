import { Model, Sequelize, STRING, INTEGER } from 'sequelize';


export class RatingModel extends Model {
    public id: number;
    public value: number;
    // public user_id: number;
    public movie_id: number;
}

export function ratingModelInit(sequelize: Sequelize): void {
    RatingModel.init(
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            value: {
                type: INTEGER,
                allowNull: false
            },
            // user_id: {
            //     type: INTEGER,
            //     allowNull: false
            // },
            movie_id: {
                type: INTEGER,
                allowNull: false
            }
        }, 
        {
            sequelize,
            modelName: 'rating'
        }
    );
}