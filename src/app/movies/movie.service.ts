import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { HttpClient} from '@angular/common/http';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class MovieService {
    private moviesUrl = '/api/movies';

    constructor (private http: HttpClient) {}

    // get("/api/movies")
    getMovies(yr: Number): Promise<any | Movie[]> {

      const options = yr ?
      { params: new HttpParams().set('year_ceremony', yr.toString()) } : {};
      return this.http.get(this.moviesUrl,options)
                 .toPromise()
                 .then(response=>response as Movie[])
                 .catch(this.handleError);
    }

    // get("/api/movies/:id")
    grabMovie(getMovie: Movie): Promise<any | Movie> {
      var getUrl= this.moviesUrl + '/' + getMovie._id;
      return this.http.get(getUrl)
                 .toPromise()
                 .then(response=>response as Movie)
                 .catch(this.handleError);
    }
    //get(OMDB)
    getOMDBDetails(title:String,year:Number) {​​​​​
      return this.http.get(`https://www.omdbapi.com/?apikey=3771a118&t=`+title+"&y="+ year.toString() +"&Plot=full");
      }​​​​​
    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); 
    }
}