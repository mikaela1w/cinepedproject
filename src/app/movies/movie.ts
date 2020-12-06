export class Movie {
    _id?: string;
    year_film!:number;
    year_ceremony!:number;
    ceremony!:number;
    category!:string;
    name!:string;
    film!:string;
    winner!:boolean;
}
export class OMDBInfo {
    _id?: string;
    year!:number;
    rated!:string;
    genre!:string;
    actors!:string;
    plot!:string;
    name!:string;
    ratings!:string;
}