import express from 'express';
import { register, login } from '../controllers/authControllers.ts';
import {validateLoginUser, validateRegisterUser} from '../middleware/validateUser.ts';

const router = express.Router();

router.post('/register', validateRegisterUser, register);
router.post('/login',validateLoginUser, login);



export default router;