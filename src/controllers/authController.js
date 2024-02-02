import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../models';

const signUp = async (req, res) => {
  // 프리즈마로 사용자 등록 로직 구현해야함
};

const login = async (req, res) => {
  // 프리즈마로 사용자로그인 로직 구현해야함
};

const getProfile = async (req, res) => {
  // 프리즈마로 사용자 프로필 가져오기 로직 구현해야함
};

export { signUp, login, getProfile };
