import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Models
import {movieModelInit, MovieModel} from '../models/movie_model';
import {UserModelInit, UserModel}   from '../models/user_model';
import { GenreModel, GenreModelInit } from '../models/genre_model';
import { RatingModel, ratingModelInit } from '../models/rating_model';


// Set environment variables.
dotenv.config();

// Instantiate sequelize ORM.

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});



// Instantiate all DB models.
movieModelInit(sequelize);
UserModelInit(sequelize);
GenreModelInit(sequelize);
ratingModelInit(sequelize)

// Set relations of DB models.

GenreModel.hasOne(MovieModel,{foreignKey:'genre', sourceKey:'id'})
MovieModel.hasOne(RatingModel,{foreignKey:'movie_id', sourceKey:'id'})
UserModel.hasOne(MovieModel,{foreignKey:'user_id', sourceKey:'id'})

// Create DB object with sequelize and models.
const db = {
    sequelize,
    Sequelize,
    Movie: MovieModel,
    User: UserModel,
    Genre: GenreModel,
    Rating: RatingModel
}

sequelize.authenticate();
sequelize.sync();

export default db;