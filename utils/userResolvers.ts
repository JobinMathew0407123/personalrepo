// src/resolvers/userResolvers.ts

import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../models/User';
import { validateInput } from '../utils/validate';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const input = { username, email, password };
    const validationErrors = await validateInput(input);

    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }

    // Process the registration...
  }
}
