import express from 'express'
import { signUp , login , logout , onBoard } from '../controllers/authControllers.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup' , signUp)
router.post('/login' , login)
router.post('/logout' , logout)
router.post('/onboard' , protectedRoute , onBoard)



export default router