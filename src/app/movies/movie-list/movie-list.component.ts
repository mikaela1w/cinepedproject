import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})

export class MovieListComponent implements OnInit {
  movies: Movie[]
  selectedMovie: Movie

  constructor(private movieService: MovieService) { }

  ngOnInit() {
     this.movieService
      .getMovies("2019")
      .then((movies: Movie[]) => {
        this.movies = movies.map((movie) => {
          return movie;
        });
      });
  }

  private getIndexOfMovie = (movieId: String) => {
    return this.movies.findIndex((movie) => {
      return movie._id === movieId;
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie
  }

}