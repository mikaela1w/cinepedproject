import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class MovieService {
    private moviesUrl = '/api/movies';

    constructor (private http: HttpClient) {}

    // get("/api/contacts")
    getMovies(): Promise<any | Movie[]> {
      return this.http.get(this.moviesUrl)
                 .toPromise()
                 .then(response=>response as Movie[])
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app


    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}