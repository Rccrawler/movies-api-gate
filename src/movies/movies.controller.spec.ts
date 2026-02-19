import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // 1. Importar el token
import { Movie } from './entities/movie.entity';      // 2. Importar la entidad


describe('MoviesController', () => {
  let controller: MoviesController;
  let module: TestingModule;


  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          // 3. Agregar el mock del repositorio de Movie
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();


    controller = module.get<MoviesController>(MoviesController);
  });


  it('getMovies() debe devolver un array de películas', async () => {
    const movies: Movie[] = [{ id: 1, title: 'Marvel' } as Movie];
    const service = module.get<MoviesService>(MoviesService);
    jest.spyOn(service, 'listMovies').mockResolvedValue(movies);

    const result = await controller.getMovies();
    expect(result).toEqual(movies);
    expect(service.listMovies).toHaveBeenCalled();
  });
});
