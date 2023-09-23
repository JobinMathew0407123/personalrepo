import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwttokenkeysecure'; // Replace with your actual secret key
const JWT_EXPIRATION = '1h'; // Set the expiration time for tokens

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string): string | object => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};