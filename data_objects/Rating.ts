import IRating from './IRating';
export default class Rating implements IRating{
    constructor(public value: number, public movie_id:number) {}
}