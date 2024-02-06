import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// 사용자 회원가입 로직
export const signUp = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  // 유효성 체크
  if (!email || !password || !confirmPassword || !name) {
    return res.status(400).json({ error: '모든 필드를 입력하세요.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
  }

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // 회원가입 성공 시 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...userData } = user;
    return res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

// 사용자 로그인 로직
export const login = async (req, res) => {
  const { email, password } = req.body;

  // 이메일 또는 비밀번호가 누락된 경우
  if (!email || !password) {
    return res.status(400).json({ error: '이메일과 비밀번호를 모두 입력하세요.' });
  }

  try {
    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 사용자가 없거나 비밀번호가 일치하지 않는 경우
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 생성
    const accessToken = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '12h' });

    // 로그인 성공 시 AccessToken 반환
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
