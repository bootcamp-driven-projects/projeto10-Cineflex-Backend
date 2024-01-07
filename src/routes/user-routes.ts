import router from 'express';
import userController from '@/controllers/users-controllers';

const user = router();

user.post('/create', userController.create);


export default user;