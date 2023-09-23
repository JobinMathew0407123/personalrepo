// src/resolvers/userResolvers.ts

import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import User, { IUser } from '../models/userModel'

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(@Arg('id') id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    return User.create({ username, email, password });
  }


  


}
