import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
/*import { Movie } from './movies.entity';*/

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.listMovies();
  }

  /*  @Get()
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.listMovies();
  }*/

  /*async getMovies(): Promise<any> {
        return [{ name: 'Error intencionado' }];
    }*/
  /*async getMovies(): Promise<MovieDto[]> {
    return this.moviesService.listMovies();
  }*/
}
