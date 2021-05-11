import { Model, Sequelize, STRING, INTEGER } from 'sequelize';


export class MovieModel extends Model {
    public id: number;
    public name: string;
    public genre: number;
    public user_id:number;
}

export function movieModelInit(sequelize: Sequelize): void {
    MovieModel.init(
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: STRING,
                allowNull: false
            },
            genre:{
                type: INTEGER,
                allowNull: false,
            },
            user_id:{
                type: INTEGER,
                allowNull: false,
            },
        }, 
        {
            sequelize,
            modelName: 'movie'
        }
    );
}
