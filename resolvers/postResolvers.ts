// src/resolvers/postResolvers.ts

import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';
import { Post } from '../models/Post';
import { isAuth } from '../middleware/auth';

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('text') text: string,
    @Ctx() { payload }: MyContext
  ): Promise<Post> {
    // Create a new post for the authenticated user
    const post = Post.create({ text, userId: payload.userId });
    return post.save();
  }
}
