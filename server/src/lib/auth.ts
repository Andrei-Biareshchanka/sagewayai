import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env['JWT_SECRET']!;
const REFRESH_SECRET = process.env['JWT_REFRESH_SECRET']!;

export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);
export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

export const signAccessToken = (userId: string, role: string) =>
  jwt.sign({ sub: userId, role }, ACCESS_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET) as { sub: string; role: string };

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET) as { sub: string };
