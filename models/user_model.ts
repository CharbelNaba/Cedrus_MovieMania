import { Model, Sequelize, STRING, INTEGER } from 'sequelize';


export class UserModel extends Model {
    public id: number;
    public name: string;
    public email: string;
    public username: string;
}

export function UserModelInit(sequelize: Sequelize): void {
    UserModel.init(
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
            email: {
                type: STRING,
                allowNull: false
            },
            username: {
                type: STRING,
                allowNull: false
            }
        }, 
        {
            sequelize,
            modelName: 'user'
        }
    );
}