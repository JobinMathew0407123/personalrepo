// src/resolvers/authResolvers.ts

import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.validPassword(password)) {
      throw new Error('Invalid email or password');
    }

    // Generate and return a JWT token upon successful login
    const token = generateToken(user.id.toString());
    return token;
  }
}
