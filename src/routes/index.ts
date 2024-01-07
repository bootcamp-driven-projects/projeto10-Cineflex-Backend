import router from 'express';
import user from './user-routes';

const routes = router();

routes.use('/', user);

export default routes;