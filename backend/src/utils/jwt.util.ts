import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const signAccessToken = (userId: string | Types.ObjectId, role: string): string => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: '15m',
  });
};

export const signRefreshToken = (userId: string | Types.ObjectId): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
