import User from "./User";
export default interface IMovie {
    id:number;
    name: string;
    genre:number;
    user_id:User['id'];
}