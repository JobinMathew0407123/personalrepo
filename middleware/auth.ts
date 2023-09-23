import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/MyContext';
import { verifyToken } from '../utils/jwt';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verifyToken(token);

    context.payload = payload as any; // Attach user data to the context

    return next();
  } catch (error) {
    throw new Error('Not authenticated');
  }
};
