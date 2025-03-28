import express from 'express';
import { register, login } from "../controllers/auth_controller"
import {validateLoginUser, validateRegisterUser} from '../middleware/validateUser';

const router = express.Router();

router.post('/register', validateRegisterUser, register);
router.post('/login',validateLoginUser, login);



export default router;