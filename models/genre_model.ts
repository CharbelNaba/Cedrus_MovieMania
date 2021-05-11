import { Model, Sequelize, STRING, INTEGER } from 'sequelize';
import { MovieModel } from "./movie_model";

export class GenreModel extends Model {
    public id: number;
    public name: string;
}

export function GenreModelInit(sequelize: Sequelize): void {

    GenreModel.init(
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: STRING,
                allowNull: false
            }
        }, 
        {
            sequelize,
            modelName: 'genre'
        }
    );
}