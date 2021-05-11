import IMovie from './IMovie';
import Genre from "./Genre";  
export default class Movie implements IMovie{
    constructor(public id:number, public name: string, public genre: number,  public user_id:number, public genre_name?:string) {}
}