import Movie from './Movie'
export default interface IRating {
    id?: number;
    value: number;
    movie_id:Movie["id"];
}