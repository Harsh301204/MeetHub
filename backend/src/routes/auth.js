import express from 'express'
import { signUp , login , logout , onBoard } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup' , signUp)
router.post('/login' , login)
router.post('/logout' , logout)
router.post('/onboard' , onBoard)



export default router