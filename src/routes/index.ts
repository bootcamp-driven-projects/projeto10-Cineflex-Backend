import router from 'express';
import user from './user-routes';
import { populateDB } from '@/controllers/populateDB';

const routes = router();

routes.use('/', user);
routes.post('/populate', populateDB);

export default routes;