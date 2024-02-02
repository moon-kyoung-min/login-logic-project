import express from 'express';
import { signUp, login, getProfile } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;
