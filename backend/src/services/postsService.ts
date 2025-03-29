import { Post } from '@prisma/client';
import { NewPost } from '../types';
import prisma from '../../data/prisma';

const getPostsFromBoard = async (boardid: number): (Promise<Post[]>) => {
    const posts: Post[] = await prisma.post.findMany({
        where: {
            boardid
        }
    });
    return posts;
};

const createPost = async (post: NewPost): (Promise<Post>) => {
    const newPost: Post = await prisma.post.create({
        data: {
            ...post
        }
    });
    return newPost;
}

export default {
  getPostsFromBoard,
  createPost
};
