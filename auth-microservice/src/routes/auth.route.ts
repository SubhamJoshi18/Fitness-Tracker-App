import { Router } from 'express';

import AuthController from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/auth/register', AuthController.register);
authRouter.post('/auth/login', AuthController.login);

export default authRouter;
