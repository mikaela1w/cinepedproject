import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import {MovieService } from '../movie.service';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent {
  @Input()
  movie: Movie;
  constructor (private movieService: MovieService) {}

  grabMovie = (movie: Movie) => {
    return movie;
  }

}