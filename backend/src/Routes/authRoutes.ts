import express from 'express';
import { registerController, loginController } from "../controllers/auth_controller"
import {validateLoginUser, validateRegisterUser} from '../middleware/validateUser';

const router = express.Router();

router.post('/register', validateRegisterUser, registerController);
router.post('/login',validateLoginUser, loginController);



export default router;