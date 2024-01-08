import router from 'express';
import user from './user-routes';
import movies from './movies-routes';
import { populateDB } from '@/controllers/populateDB';

const routes = router();

routes.use('/', user);
routes.use('/movies', movies);
routes.post('/populate', populateDB);

export default routes;