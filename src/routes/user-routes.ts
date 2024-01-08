import router from 'express';
import userController from '@/controllers/users-controllers';

const user = router();

user.post('/register', userController.register);
user.post('/login', userController.login);


export default user;