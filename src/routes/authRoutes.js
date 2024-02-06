import express from 'express';
import { signUp, login } from '../controllers/authController';

const router = express.Router();

// 회원가입 API
router.post('/signup', signUp);

// 로그인 API
router.post('/login', login);

export default router;
