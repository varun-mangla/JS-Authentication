import express from 'express';
import { registerUser, verifyuser } from '../controller/user.controller.js';


const router = express.Router();


router.post('/register',registerUser);
router.get('/verify/:token',verifyuser);



export default router;

