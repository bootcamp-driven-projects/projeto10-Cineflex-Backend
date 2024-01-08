import router from 'express';
import moviesControllers from '@/controllers/movies-controllers';

const movies = router();

movies.get('/listbydate', moviesControllers.listbydate);

export default movies;